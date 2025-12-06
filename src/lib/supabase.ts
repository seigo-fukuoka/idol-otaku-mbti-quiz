import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const saveDiagnosisLog = async (resultType: string, userAnswers: Record<string, unknown>) => {
  const { error } = await supabase
    .from('diagnosis_logs')
    .insert({
      result_type: resultType,
      user_answers: userAnswers,
    });

  if (error) {
    console.error('Error saving diagnosis log:', error);
  }
};
