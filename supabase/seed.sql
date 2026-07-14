-- Seed projects table
insert into projects (slug, title, description, image_url, link, tags, sort_order) values
('lekali-karesa', 'Lekali Karesa', 'A digital platform promoting sustainable agriculture and connecting farmers with markets.', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_20250306_160437_Chrome.jpg-DehTvMXPyoyquKWijowu96dLws0825.jpeg', 'https://v0-marsi-rice-wp.vercel.app/', ARRAY['Entrepreneurship', 'Agriculture', 'Sustainability'], 0),
('season-electric', 'Season Electric', 'Innovative electric solutions for sustainable energy consumption in rural areas.', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1727941284227.jpg-AbQ66398r7kyfejuB2Wfj7bddHe16m.jpeg', 'https://www.facebook.com/seasonsuppliers', ARRAY['Energy', 'Sustainability', 'Engineering'], 1),
('digital-nepal', 'Digital Nepal Initiative', 'Leading digital literacy and technology adoption programs across Nepal, empowering communities through education and training.', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_20250308_135339_Chrome.jpg-oo8Lcj3EdJIZg8DBtGMzddKdUxr7Wu.jpeg', 'https://restlessdevelopment.org/2023/12/youth-power-in-2023/', ARRAY['Digital Advocacy', 'Education', 'Community'], 2),
('tech-education', 'Tech Education Program', 'Comprehensive technology education initiative bringing digital skills to underserved communities across Nepal.', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FB_IMG_1741256746789.jpg-ULYvSnEAIFdtGx8SJ8sOOs9Phbnmq6.jpeg', '', ARRAY['Education', 'Technology', 'Community'], 3),
('marsi-rice', 'Marsi Rice', 'Premium rice grown at the world''s highest altitude of 3000m in the pristine Himalayas of Nepal.', 'https://sjc.microlink.io/cSsHOE0uU8D3fyEG0Bq3si0YYs-PvDq7R511lzLxau1H8P8Nh4l_Fdja3emEH-DBoVnaPjnLHHTIi7eb1mMd2g.jpeg', 'https://v0-marsi-rice-wp.vercel.app/', ARRAY['Agriculture', 'Organic', 'Sustainability'], 4);

-- Seed blog posts
insert into posts (slug, title, excerpt, content, tags, published_at) values
('ai-machine-learning-transforming-rural-nepal', 'The Role of AI and Machine Learning in Transforming Rural Nepal', 'Exploring how AI and ML technologies are revolutionizing agriculture, healthcare, education, and rural development in Nepal.', '# The Role of AI and Machine Learning in Transforming Rural Nepal

## Introduction

Nepal''s rural regions, home to **80% of its population** (World Bank, 2023), grapple with systemic challenges: **28.6% poverty rates** (National Planning Commission, 2022), inadequate healthcare (1 doctor per 1,500 people in rural areas), and agricultural inefficiencies. However, AI and ML are emerging as tools to bridge these gaps. With **94% mobile penetration** (Nepal Telecommunications Authority, 2023) and growing tech innovation, rural Nepal stands on the cusp of a digital revolution.

## AI in Agriculture: Boosting Productivity

Agriculture employs **66% of Nepal''s workforce** (FAO, 2022) but contributes only 27% to GDP, reflecting inefficiencies. Precision Farming pilot projects in Kavre District using AI-driven soil sensors increased yields by **32%** (ICIMOD, 2021). ML models from Practical Action Nepal reduced crop losses by **40%** in monsoon-dependent regions by providing 72-hour rainfall forecasts.

### Pest Management

An AI app developed by FarmDrive Africa (adapted for Nepal) cut pesticide use by **25%** through early infestation detection (CIMMYT, 2022). Nepal loses **$150 million annually** to post-harvest waste (UNDP, 2021). AI-powered cold chain solutions could recover **30%** of these losses, significantly improving farmer incomes and food security.

## Conclusion

From cutting farm losses to saving lives and educating marginalized communities, AI and ML are rewriting rural Nepal''s story.', ARRAY['Technology', 'AI', 'Rural Development', 'Innovation'], '2025-03-21'::timestamptz),
('marsi-rice-worlds-highest-cultivated-rice', 'Marsi Rice: The World''s Highest Cultivated Rice', 'Discover the unique story of Marsi Rice, grown at an elevation of 3000m in the pristine Himalayas of Nepal.', '# Marsi Rice: The World''s Highest Cultivated Rice

## Introduction

At an elevation of over 3000 meters in the pristine Jumla Tsum Valley Patarasi of Nepal, a remarkable agricultural achievement takes place each year. Here, local farmers cultivate Marsi Rice, what is recognized as the world''s highest grown rice variety.

## A Unique Growing Environment

The extreme altitude creates a distinctive growing environment that imparts special characteristics to the rice.', ARRAY['Agriculture', 'Sustainability', 'Himalayan Products'], '2023-12-10'::timestamptz),
('lifi-technology-wireless-communication-rural-nepal', 'Li-Fi Technology: The Future of Wireless Communication in Rural Nepal', 'Exploring how Li-Fi technology can revolutionize internet connectivity in remote areas of Nepal, particularly in the Karnali region.', '# Li-Fi Technology: The Future of Wireless Communication in Rural Nepal

## Introduction

In the rugged terrain of Nepal''s Karnali region, internet connectivity remains a significant challenge.', ARRAY['Technology', 'Communication', 'Rural Development'], '2023-11-25'::timestamptz),
('sustainable-agriculture-nepal', 'The Future of Sustainable Agriculture in Nepal', 'Exploring how technology and traditional farming practices can create a sustainable agricultural future for Nepal.', '# The Future of Sustainable Agriculture in Nepal

## Introduction

Nepal''s agricultural sector faces unique challenges due to its diverse topography and climate conditions.', ARRAY['Agriculture', 'Sustainability', 'Technology'], '2023-10-15'::timestamptz),
('renewable-energy-rural-communities', 'Renewable Energy Solutions for Rural Communities', 'How decentralized renewable energy systems are transforming life in rural Nepal and creating new opportunities.', '# Renewable Energy Solutions for Rural Communities

## Introduction

Access to reliable electricity remains a challenge for many rural communities in Nepal.', ARRAY['Energy', 'Rural Development', 'Sustainability'], '2023-09-02'::timestamptz),
('digital-literacy-nepal-future', 'Digital Literacy: The Key to Nepal''s Future', 'Why digital literacy is essential for Nepal''s development and how we can ensure it reaches all communities.', '# Digital Literacy: The Key to Nepal''s Future

## Introduction

In today''s interconnected world, digital literacy has become as fundamental as traditional literacy.', ARRAY['Digital Literacy', 'Education', 'Development'], '2023-08-18'::timestamptz),
('entrepreneurship-nepal', 'Entrepreneurship in Nepal: Challenges and Opportunities', 'Insights into the entrepreneurial ecosystem in Nepal and strategies for success in a developing market.', '# Entrepreneurship in Nepal: Challenges and Opportunities

## Introduction

The entrepreneurial landscape in Nepal is evolving rapidly, with new startups emerging across various sectors.', ARRAY['Entrepreneurship', 'Business', 'Innovation'], '2023-07-05'::timestamptz);
