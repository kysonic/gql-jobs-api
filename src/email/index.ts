import * as ejs from 'ejs';

type Data = {
  [key: string]: unknown;
};

export const EMAIL_DEFAULT_RESOURCES = ['./public/assets/email/logo.png'];

export async function renderEmailTemplate(
  templateName: string,
  data: Data,
): Promise<string> {
  return ejs.renderFile(`${__dirname}/templates/${templateName}.ejs`, {
    ...data,
    assetsPath: 'cid:',
  });
}
