#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { MinesweeperStack } from '../lib/minesweeper-stack';

const app = new cdk.App();
new MinesweeperStack(app, 'MinesweeperStack', {

});