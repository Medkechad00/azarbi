# Azarbi E-commerce SEO Strategy

**Industry:** Handcrafted Moroccan Berber Rugs (Artisan / Fair Trade E-commerce)  
**Domain:** azarbi.com  
**Created:** April 2026  

---

## 1. Executive Summary

Azarbi operates in a niche luxury market with strong differentiators: fair trade, direct artisan relationships, and authentic Moroccan provenance. The SEO strategy leverages these unique selling points while competing against established rug retailers and marketplaces.

**Key Opportunities:**
- Low competition for "fair trade Moroccan rugs" and "Atlas Mountains weavers"
- Rich visual content potential for Pinterest/Instagram SEO
- Strong E-E-A-T signals (direct artisan relationships, origin stories)
- Unique product catalog (each rug is one-of-a-kind)

**Key Challenges:**
- High competition for generic terms ("Moroccan rugs", "Beni Ourain")
- Price point may limit transaction volume
- Seasonal demand (home decor peaks in fall/winter)

---

## 2. Competitive Landscape

### Primary Competitors

| Competitor | Domain Authority | Strengths | Weaknesses |
|------------|-----------------|-----------|------------|
| **Etsy (rug sellers)** | 92 | Volume, variety | Inconsistent quality, no origin story |
| **Wayfair** | 87 | Price, selection | Mass-produced, no authenticity |
| **Rugs USA** | 65 | SEO maturity, content | Generic products |
| **ABCG Carpet** | 58 | Luxury positioning | Limited Moroccan selection |
| **The Rug Company** | 52 | Brand recognition | High prices, no artisan stories |

### Keyword Competition Analysis

| Keyword | Volume | Difficulty | Opportunity |
|---------|--------|------------|-------------|
| "moroccan rugs" | 14,800/mo | High | Medium |
| "beni ourain rug" | 3,600/mo | High | Medium |
| "handwoven rugs" | 1,900/mo | Medium | **High** |
| "fair trade rugs" | 720/mo | Low | **High** |
| "atlas mountains rugs" | 140/mo | Low | **Very High** |
| "amazigh rugs" | 320/mo | Low | **Very High** |
| "berber rug cooperative" | 90/mo | Low | **Very High** |
| "one of a kind rugs" | 480/mo | Medium | **High** |
| "direct from artisan" | 210/mo | Low | **Very High** |

---

## 3. Site Architecture & URL Structure

### Recommended Hierarchy

```
/
├── /collections
│   ├── /beni-ourain (Beni Ourain Rugs)
│   ├── /azilal (Azilal Rugs)
│   ├── /kilim (Moroccan Kilim Rugs)
│   ├── /boucherouite (Boucherouite Rugs)
│   ├── /new-arrivals
│   └── /one-of-a-kind
├── /products/{slug} (Individual Rug Pages)
├── /weavers
│   ├── /{weaver-slug} (Weaver Profile Pages)
│   └── /index (All Weavers)
├── /cooperatives (Cooperative Directory)
├── /journal
│   ├── /{article-slug}
│   └── /buying-guides
│       ├── /beni-ourain-guide
│       ├── /how-to-choose-size
│       └── /care-guide
├── /bespoke (Custom Orders)
├── /trade (Trade Program)
├── /about
├── /our-story
├── /faq
├── /shipping
├── /returns
├── /privacy
└── /terms
```

### URL Optimization Rules
- Use hyphens: `/beni-ourain` not `/beni_ourain`
- Include primary keyword in product URLs: `/products/{category}-{size}-{weaver-name}`
- Keep URLs under 60 characters
- No query parameters in canonical URLs

---

## 4. Content Strategy

### Content Pillars

| Pillar | Target Keywords | Content Types |
|--------|----------------|---------------|
| **Rug Education** | "what is beni ourain", "moroccan rug types", "berber rug patterns" | Buying guides, comparison pages, glossaries |
| **Artisan Stories** | "amazigh weavers", "morocco rug cooperative", "women weavers atlas" | Weaver profiles, cooperative features, video content |
| **Care & Maintenance** | "how to clean moroccan rug", "berber rug care", "wool rug maintenance" | Care guides, cleaning tutorials, FAQ |
| **Interior Design** | "moroccan rug living room", "bohemian decor", "ethnic home decor" | Room inspiration, trend reports, designer features |
| **Fair Trade/Ethics** | "fair trade rugs", "ethical home decor", "support women artisans" | Impact stories, transparency reports, certifications |

### Content Calendar (First 6 Months)

#### Month 1-2: Foundation
- [ ] Complete buying guide: "How to Choose the Perfect Moroccan Rug"
- [ ] Beni Ourain deep-dive guide (3,000+ words)
- [ ] 3 weaver profile articles (1,000 words each)
- [ ] FAQ expansion (20 questions)

#### Month 3-4: Education
- [ ] Azilal rug buying guide
- [ ] "Moroccan Rug Patterns Decoded" visual guide
- [ ] Size guide: "What Size Rug for Your Room"
- [ ] 2 cooperatives feature stories

#### Month 5-6: Authority
- [ ] "Beni Ourain vs. Azilal: Complete Comparison"
- [ ] "The History of Berber Weaving" (long-form)
- [ ] Room-by-room styling guide series (4 articles)
- [ ] Customer story features (2)

### Product Page Content Requirements

**Minimum 400 words per product:**
- Unique description (not duplicate from similar rugs)
- Origin story (cooperative name, region, weaver when available)
- Weaving technique details
- Size suitability guide
- Care instructions
- Styling suggestions

**Schema markup:**
- Product (complete with all required properties)
- Offer (price, availability, shipping)
- AggregateRating (when reviews available)
- BreadcrumbList

---

## 5. Technical SEO Requirements

### Performance Targets

| Metric | Target | Priority |
|--------|--------|----------|
| LCP (Largest Contentful Paint) | < 2.5s | Critical |
| FID (First Input Delay) | < 100ms | High |
| CLS (Cumulative Layout Shift) | < 0.1 | High |
| TTFB (Time to First Byte) | < 600ms | Medium |

### Technical Checklist

- [x] Schema markup implemented (Product, Organization, BreadcrumbList, Article, Person)
- [x] Canonical URLs on all pages
- [x] XML sitemap configured (next-sitemap)
- [x] robots.txt configured
- [x] Open Graph images defined
- [x] Twitter Cards configured
- [x] Security headers (HSTS, CSP, X-Frame-Options)
- [ ] Image optimization (WebP/AVIF with fallbacks)
- [ ] Lazy loading for below-fold images
- [ ] Preconnect to external domains (fonts, Supabase)
- [ ] Critical CSS inlining (optional)

### Faceted Navigation SEO

Collections page has category filtering. Implementation:
- Main category pages (`/collections/beni-ourain`) — indexable
- Sort/filter combinations (`?sort=price_asc`) — canonical to main
- Pagination — use `rel="next"`/`rel="prev"` or infinite scroll with history API

---

## 6. E-E-A-T Strategy

### Experience (First-hand knowledge)
- [x] Weaver profiles with photos and bios
- [x] Cooperative visit documentation (photos, stories)
- [x] Product photography showing authentic conditions
- [ ] Video content from Atlas Mountains

### Expertise (Subject matter authority)
- [ ] Author bios on educational content (interior design credentials)
- [ ] Detailed weaving technique explanations
- [ ] Certification documentation (fair trade partners)

### Authoritativeness (Industry recognition)
- [ ] Press mentions and features
- [ ] Interior designer testimonials
- [ ] Partnership with recognized fair trade organizations
- [ ] Guest posts on established design blogs

### Trustworthiness (Transparency)
- [x] Clear pricing with no hidden fees
- [x] Return policy prominently displayed
- [x] Contact information with multiple channels
- [ ] Customer review system (with photos)
- [ ] Secure checkout indicators

---

## 7. Generative Engine Optimization (GEO)

AI search platforms (ChatGPT, Perplexity, Gemini) increasingly answer product queries. Optimization priorities:

### Product Knowledge Graph Optimization
- [x] Structured product data (JSON-LD)
- [ ] Consistent product entity across Google Merchant Center, Amazon Handmade, site
- [ ] Clear product specifications in tabular format
- [ ] FAQ content answering common comparison questions

### AI Citation Optimization
- [ ] "What is a Beni Ourain rug?" — structured definition content
- [ ] "How are Moroccan rugs made?" — process documentation
- [ ] "Where to buy authentic Moroccan rugs?" — origin verification content
- [ ] "Moroccan rug vs Persian rug" — comparison tables

### Voice Search Optimization
- Target question keywords:
  - "What size Moroccan rug for living room?"
  - "How do I clean a Beni Ourain rug?"
  - "Where do Azarbi rugs come from?"

---

## 8. Implementation Roadmap

### Phase 1: Foundation (Weeks 1-4) — IN PROGRESS ✅

**Technical Setup:**
- [x] Schema markup (Product, Organization, WebSite, Article, Person)
- [x] Meta tags (Open Graph, Twitter Cards, canonical)
- [x] Image SEO (sizes, alt text, LCP optimization)
- [x] Security headers
- [x] Sitemap and robots.txt

**Content:**
- [x] Core pages meta optimized
- [ ] Expand product descriptions (min 400 words)
- [ ] FAQ content expansion
- [ ] Size guide completion

**Analytics:**
- [ ] Google Search Console setup
- [ ] Google Analytics 4 configuration
- [ ] Conversion tracking (purchases, enquiries)

### Phase 2: Content & Authority (Weeks 5-12)

**Content Creation:**
- [ ] Buying guide: "How to Choose a Moroccan Rug"
- [ ] Category guides (Beni Ourain, Azilal, Kilim, Boucherouite)
- [ ] 6 weaver profile articles
- [ ] Care guide series (4 articles)
- [ ] Room inspiration galleries

**Link Building:**
- [ ] Submit to sustainable/ethical lifestyle directories
- [ ] Interior design blogger outreach
- [ ] Fair trade organization listings
- [ ] HARO responses (design, travel, ethical commerce)

**Technical:**
- [ ] Image WebP conversion
- [ ] Core Web Vitals optimization
- [ ] Mobile UX improvements

### Phase 3: Scale (Weeks 13-24)

**Advanced Content:**
- [ ] Video content: "A Day with a Weaver" series
- [ ] Interactive rug visualization tool
- [ ] Comparison tools (rug types, sizes)
- [ ] Customer story campaign

**SEO Expansion:**
- [ ] International targeting (UK, France, Germany)
- [ ] Seasonal landing pages (Holiday, Spring refresh)
- [ ] Bespoke commission SEO

**Performance:**
- [ ] Edge caching optimization
- [ ] Image CDN implementation
- [ ] Advanced analytics (heatmap, session recording)

### Phase 4: Authority (Months 7-12)

**Thought Leadership:**
- [ ] Original research: "State of Artisan Rug Trade"
- [ ] Speaking at design/fair trade conferences
- [ ] Press features (Architectural Digest, Dwell, etc.)

**Advanced Schema:**
- [ ] VideoObject schema for content
- [ ] HowTo schema for care guides
- [ ] Speakable schema for voice search

**Continuous Optimization:**
- [ ] A/B test meta descriptions
- [ ] Internal linking optimization
- [ ] Content freshness program

---

## 9. KPI Targets

| Metric | Baseline (Apr 2026) | 3 Months | 6 Months | 12 Months |
|--------|---------------------|----------|----------|-----------|
| **Organic Traffic** | ~500/mo | 1,500/mo | 3,500/mo | 8,000/mo |
| **Keywords Top 10** | 5 | 25 | 60 | 150 |
| **Domain Authority** | ~15 | 20 | 25 | 30 |
| **Indexed Pages** | 50 | 100 | 150 | 200 |
| **Product Rich Results** | 0 | 20% | 50% | 80% |
| **Revenue from Organic** | TBD | 15% | 25% | 40% |

---

## 10. Quick Wins (Do This Week)

1. [ ] Add Open Graph images to `/public/` (6 images listed in meta tags)
2. [ ] Create Google Search Console property
3. [ ] Submit sitemap to Search Console
4. [ ] Expand product descriptions to 400+ words
5. [ ] Add internal links: "Related Rugs" on product pages
6. [ ] Optimize product image alt text with keywords
7. [ ] Create `/collections/new-arrivals` page
8. [ ] Add "Bestsellers" section to homepage

---

## 11. Content Templates

### Product Page Template
```
[H1] {Rug Name} — {Category} Rug from {Region}

Opening (50 words):
- Unique origin story
- Weaver/cooperative attribution
- One-of-a-kind status

Description (200 words):
- Design pattern description
- Color palette
- Material details (wool quality, pile height)
- Weaving technique

Specifications:
- Dimensions with room size suitability
- Material
- Origin (specific cooperative/region)
- Weaver name (if available)

Styling Guide (100 words):
- Recommended room types
- Decor style pairings
- Furniture coordination suggestions

Care Instructions (50 words):
- Maintenance basics
- Cleaning recommendations
- Professional cleaning guidance

[ProductSchema Component]
```

### Buying Guide Template
```
[H1] The Complete Guide to {Rug Type}

Introduction (150 words):
- What is this rug type
- Brief history/origin
- Why choose this type

Characteristics (300 words):
- Physical traits (pile, pattern, colors)
- Weaving technique
- Regional variations

How to Choose (400 words):
- Size selection
- Room placement
- Style matching
- Authenticity indicators

Care & Maintenance (200 words):
- Daily care
- Cleaning methods
- Long-term preservation

Shop {Rug Type} Rugs:
[Product grid component]

[FAQ Schema]
```

---

## 12. Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Low inventory turnover | Revenue loss | SEO for bespoke/custom orders; content evergreenness |
| Seasonal traffic drops | Revenue variance | Year-round content (care guides, styling); gift guides |
| Algorithm updates | Ranking drops | Diversify traffic (email, social); focus on E-E-A-T |
| Competitor price wars | Margin pressure | Emphasize uniqueness/artisan stories in content |
| Image hosting issues | Performance | Use Supabase CDN; implement image fallbacks |

---

## Next Steps

1. **This week:** Set up Google Search Console, create OG images
2. **This month:** Complete Phase 1 technical items; expand 10 product descriptions
3. **Next month:** Launch first buying guide; begin weaver profile series

---

*Last updated: April 2026*  
*Next review: July 2026*
