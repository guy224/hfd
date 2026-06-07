import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tmslorwydqzpthukmplq.supabase.co';
const supabaseKey = 'sb_publishable_-wPCC5DZTJHJyznrn5qoeQ_raeLjUg';

export const supabase = createClient(supabaseUrl, supabaseKey);
