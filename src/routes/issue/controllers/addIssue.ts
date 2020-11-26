import { Context, Next } from 'koa';
import Issue, { IssueType, IssueDocument } from '../../../models/Issue';

export default async (ctx: Context, next: Next): Promise<void> => {
  const newIssue: IssueType = ctx.request.body;
  newIssue.meta.ip = ctx.header.host;
  try {
    const newIssueDoc: IssueDocument = Issue.build(newIssue);
    await newIssueDoc.save();
    ctx.response.status = 200;
  } catch (e) {
    ctx.throw(400, 'validation failed');
  }

  await next();
};
