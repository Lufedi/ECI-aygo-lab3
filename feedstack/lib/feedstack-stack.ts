import * as cognito from "@aws-cdk/aws-cognito"
import { Mfa, UserPool } from "@aws-cdk/aws-cognito";
import * as cdk from '@aws-cdk/core';

export class FeedstackStack extends cdk.Stack {
  userPool:UserPool;

  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    this.addUserPool();
    this.addThirdPartyLogin();
  }

  addThirdPartyLogin() {
    new cognito.UserPoolIdentityProviderAmazon(this, 'Amazon', {
      clientId: 'amzn-client-id',
      clientSecret: 'amzn-client-secret',
      userPool: this.userPool,
      attributeMapping: {
        email: cognito.ProviderAttribute.AMAZON_EMAIL,
        fullname: cognito.ProviderAttribute.AMAZON_NAME
      },
    });
  }

  addUserPool() {
    this.userPool = new cognito.UserPool(this, 'lab3aygo', {
      userPoolName: "feedsaygo",
      // ...
      selfSignUpEnabled: true,
      userVerification: {
        emailSubject: 'Verify your email for our awesome app!',
        emailBody: 'Hello {username}, Thanks for signing up to our awesome app! Your verification code is {####}',
        emailStyle: cognito.VerificationEmailStyle.CODE,
        smsMessage: 'Hello {username}, Thanks for signing up to our awesome app! Your verification code is {####}',
      },
      signInAliases: {
        email: true,
      },
      autoVerify: {
        email: true
      },
      standardAttributes: {
        fullname: {
          required: true,
          mutable: false,
        }
      },
      mfa: Mfa.OPTIONAL,
      mfaSecondFactor: {
        sms: true,
        otp: true
      },
      passwordPolicy: {
        minLength: 8,
        requireDigits: true,
      },      
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,

    });

    this.userPool.addClient("feedsaygo", {
      authFlows: {
        userPassword: true,
        userSrp: true,
      }
    });


    this.userPool.addDomain('CognitoDomain', {
      cognitoDomain: {
        domainPrefix: 'feedsaygo',
      },
    });  
  }
}

//lab3aygofeedsaygoC523A448-iIIObWRrEMa7--hfj4n0hogc397dhipnr2vlfjb
