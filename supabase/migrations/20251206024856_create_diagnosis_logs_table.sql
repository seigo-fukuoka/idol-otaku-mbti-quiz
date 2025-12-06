/*
  # Create diagnosis logs table

  1. New Tables
    - `diagnosis_logs`
      - `id` (uuid, primary key) - Unique identifier for each diagnosis log
      - `result_type` (text) - The diagnosis result type (e.g., "INTJ", "ENFP", etc.)
      - `created_at` (timestamptz) - Timestamp when the diagnosis was completed
      - `user_answers` (jsonb) - Optional: Store user's answers for future analysis
  
  2. Security
    - Enable RLS on `diagnosis_logs` table
    - Add policy for anonymous users to insert their own data
    - This is a public diagnostic app, so we allow insertions without authentication
*/

CREATE TABLE IF NOT EXISTS diagnosis_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  result_type text NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_answers jsonb
);

ALTER TABLE diagnosis_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert diagnosis logs"
  ON diagnosis_logs
  FOR INSERT
  TO anon
  WITH CHECK (true);