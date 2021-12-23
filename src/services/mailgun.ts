import dotenv from 'dotenv';
import Mailgun, { messages } from 'mailgun-js';
import { renderEmailTemplate, EMAIL_DEFAULT_RESOURCES } from '../email';

dotenv.config();

export const mailgun = Mailgun({
  apiKey: process.env.MAILGUN_APIKEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const MAILGUN_SUCCESS_MESSAGE = 'Queued. Thank you.';

export type MailgunResponse = Promise<messages.SendResponse>;

export async function sendMailgunEmail(
  email: string,
  subject: string,
  html: string,
  resources = [],
): MailgunResponse {
  const data = {
    from: 'Postman <random@commodo.com>',
    to: email,
    subject,
    html,
    inline: EMAIL_DEFAULT_RESOURCES.concat(resources),
  };

  const response = await mailgun.messages().send(data);

  if (response?.message !== MAILGUN_SUCCESS_MESSAGE) {
    throw new Error(response.message);
  }

  return response;
}

export async function approveEmail(
  email: string,
  url: string,
): MailgunResponse {
  const html = await renderEmailTemplate('approve-email', { url });

  return sendMailgunEmail(email, 'Approve your email', html);
}

export async function forgetEmail(
  email: string,
  url: string,
): Promise<MailgunResponse> {
  const html = await renderEmailTemplate('forget-email', { url });

  return sendMailgunEmail(email, 'Forgot password?', html);
}
