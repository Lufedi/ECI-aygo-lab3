#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { FeedstackStack } from '../lib/feedstack-stack';

const app = new cdk.App();
new FeedstackStack(app, 'FeedstackStack');
