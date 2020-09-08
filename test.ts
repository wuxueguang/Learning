/* eslint-disable @typescript-eslint/array-type */
import { Document, Schema } from 'mongoose'
import { mongooseOcr } from '../../models/mongodb'
import { JobType, Ref, Status } from './pipeline.definition.model'

export enum OcrProvider{
  tpa,
  review,
  mixed_tpa_review
}

export enum LogicOperator{
  and, or
}

export enum BooleanOperator{

  contains,
  startWith,
  endWith,

}

export interface LogicExpression{

  operator: LogicOperator;
  expressions: Array<BoolExpression | LogicExpression>;
}

export interface BoolExpression {
  operator: BooleanOperator;
  operands: [string, number | string | string[]];
}

export interface ResultSchema{
  id: string;
  name: string;
  title: string;
  type: number | string | ResultSchema[];
  unit?: string;
  mergeRule: 'add' | 'replace' | 'append';
}

export interface OcrJobMetadata extends Document{

  dataSchema: ResultSchema[];
  enableMergedRecognitionResult: boolean;
  enableFeedback: boolean;
  showRecognitionResult: boolean;
  provider: OcrProvider;
  imageType: string;
  stateExpressions: LogicExpression;
}

export interface JobDefinitionModel extends Document {
  key: string;
  name: string;
  pipelineDefinitionKey: string;
  stage: JobType;
  jobType: JobType;
  jobMetadata: OcrJobMetadata;
  deleted: boolean;
  createDate: Date;
  updateDate: Date;
}

const JobDefinitionSchema: Schema = new Schema({
  id: { type: String, unique: true, required: true },
  jobKey: { type: String },
  name: { type: String },
  stageId: { type: String },
  status: { type: String, enum: Object.keys(Status) },
  deleted: { type: Boolean, required: true, default: false },
  createDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
}, { strict: false })

// Export the model and return your IUser interface
export default mongooseOcr.model<JobDefinitionModel>('job_definition', JobDefinitionSchema)





