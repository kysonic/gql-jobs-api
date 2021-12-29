import Job from '../../../models/Job';
import { Context } from '../../../types/shared';
import {
  BenefitEnum,
  LevelEnum,
  QueryJobsArgs,
  SkillEnum,
} from '../../../types/schema';
import checkAuthorization from '../../../middlewares/checkAuthorization';

type PossibleMatch = {
  $match: {
    $text?: { $search: string };
    skills?: { $all?: Array<SkillEnum | null> };
    benefits?: { $all?: Array<BenefitEnum | null> };
    level?: LevelEnum;
    'salary.from'?: { $gte: number | null | undefined };
    'salary.to'?: { $lte: number | null | undefined };
  };
};

export default async (
  parent: undefined,
  {
    textSearch,
    skills,
    level,
    salary,
    benefits,
    page = 1,
    limit = 10,
  }: QueryJobsArgs,
  { req, res }: Context,
) => {
  await checkAuthorization(req, res);

  const aggregationPipeline = [];
  const $match: PossibleMatch = {
    $match: {},
  };

  if (textSearch) {
    $match.$match.$text = { $search: textSearch };
  }

  if (skills) {
    $match.$match.skills = { $all: skills };
  }

  if (level) {
    $match.$match.level = level;
  }

  if (salary) {
    $match.$match['salary.from'] = { $gte: salary.from };
    $match.$match['salary.to'] = { $lte: salary.to };
  }

  if (benefits) {
    $match.$match.benefits = { $all: benefits };
  }

  if (Object.keys($match.$match).length) {
    aggregationPipeline.push($match);
  }

  if (page && limit) {
    const skip = (page - 1) * limit;

    aggregationPipeline.push({ $skip: skip });
    aggregationPipeline.push({ $limit: limit });
  }

  const jobs = await Job.aggregate(aggregationPipeline);

  return jobs;
};
