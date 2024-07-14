import { NextResponse } from 'next/server';

var cron = require('node-cron');

export async function POST(req, res) {
  try {
    cron.schedule('1 * * * *', async () => {
      console.log('');
      console.log('######################################');
      console.log('#                                    #');
      console.log('# Running scheduler every 1 minutes #');
      console.log('#                                    #');
      console.log('######################################');
      console.log('');

      // Perform your action here
    });

    return NextResponse.json({ data: 'Success', status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
