import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tmslorwydqzpthukmplq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtc2xvcnd5ZHF6cHRodWttcGxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4MzIzMjgsImV4cCI6MjA5NjQwODMyOH0.S3yfxAY1mAI5geEArqJ4L88DGdCDzIWDUNtwlZkc7-A';

export const supabase = createClient(supabaseUrl, supabaseKey);
