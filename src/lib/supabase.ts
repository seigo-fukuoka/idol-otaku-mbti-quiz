import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Supabaseクライアントをオプショナルに（環境変数がない場合でもアプリが動作するように）
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const saveDiagnosisLog = async (resultType: string, userAnswers: Record<string, unknown>) => {
  if (!supabase) {
    console.warn('Supabase is not configured. Skipping log save.');
    return;
  }

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
