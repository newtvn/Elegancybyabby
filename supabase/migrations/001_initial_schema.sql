-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('men','women','children','official','outdoors','corporate')),
  images TEXT[] NOT NULL DEFAULT '{}',
  is_trending BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Special requests table
CREATE TABLE special_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  description TEXT NOT NULL,
  reference_image TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','reviewed','completed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_trending ON products(is_trending) WHERE is_trending = true;

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE special_requests ENABLE ROW LEVEL SECURITY;

-- Products: public read, authenticated write
CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT USING (true);

CREATE POLICY "Products are editable by authenticated users"
  ON products FOR ALL USING (auth.role() = 'authenticated');

-- Special requests: public insert, authenticated read/update
CREATE POLICY "Anyone can submit a request"
  ON special_requests FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view requests"
  ON special_requests FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update requests"
  ON special_requests FOR UPDATE USING (auth.role() = 'authenticated');
