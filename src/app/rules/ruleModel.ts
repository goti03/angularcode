import { RuleDynamic } from './ruleDynamic';

export class Rule {
    ruleId: number;
    programId:number;
    drlFileName:string;
    ruleName:string;
    ruleConditions:Array<RuleDynamic>;
    createdBy:number;
    activeInd:string;
    createdOn:Date;
    deleteList:Array<any>;
  }
  