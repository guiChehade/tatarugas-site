# Tatarugas — site público

Site estático, sem build step. Pronto pra subir em qualquer host (Vercel, Netlify, GitHub Pages, S3, Cloudflare Pages, etc.).

## Papel no projeto

Este diretório é a fonte canônica do site público em `tatarugas.com.br`.

Ele fica dentro do monorepo por conveniência operacional, mas mantém
`git` próprio de forma intencional porque o site é público no GitHub e o
app mobile não.

## Estrutura

```
index.html       Home
contato.html     Form de contato (FormSubmit)
delete-account.html Fluxo publico de exclusao com confirmacao por email
privacy.html     Política de Privacidade
terms.html       Termos de uso
site.css         Tokens + componentes
site.js          Theme toggle, mensagens de sucesso por querystring e scroll-reveal
tuca.js          Organismo de partículas da Tuca (canvas + rAF)
assets/
  logo.svg       Logo (currentColor — herda do tema)
  favicon.svg    Favicon anterior
  favicon-backup.svg Backup explÃ­cito do favicon anterior
  og-image.svg   Imagem do Open Graph
```

## Deploy rápido

### Vercel / Netlify
- Arrasta a pasta inteira ou liga o repositório.
- Sem build command. Output directory: a própria raiz.

### GitHub Pages
- `Settings › Pages › Source: Deploy from branch › main / root`.

### S3 / Cloudflare R2
- `aws s3 sync . s3://seu-bucket --delete`
- Configure index document = `index.html`, error document = `index.html`.

## Características

- **Responsivo:** mobile, tablet e desktop. Tudo em `clamp()` + grids fluidas.
- **2 temas:** `ember` (escuro, default) e `manhã` (claro). Persistência em localStorage. Bootstrap síncrono — sem FOUC.
- **A Tuca:** canvas com a mesma matemática 3D do componente RN do app (mesmas cores `--tuca` / `--tuca-core`, mesma órbita, mesmo trail).
- **Acessibilidade:** respeita `prefers-reduced-motion`, foco visível, aria-pressed/aria-live nos pontos certos.
- **Performance:** sem build, sem dependências externas além das fontes do Google. Tuca pausa quando fora da viewport e quando a aba perde foco.
- **SEO:** meta description, Open Graph, Twitter Card, theme-color por tema.

## Configurações que podem precisar de ajuste

1. **Domínio do FormSubmit** em `contato.html` e `index.html` — confirme que `_next` aponta pro domínio certo em produção.
2. **Delete account endpoint** em `delete-account.html` — confirme se a URL da edge function continua apontando pro projeto Supabase certo.
3. **Open Graph image** — `assets/og-image.svg` é um SVG; alguns crawlers preferem PNG/JPG 1200×630. Considere exportar uma versão raster.
4. **Deploy** — como o diretório tem `git` próprio, publique por ele; o repo do app não deve ser a fonte de deploy do site.

— feito devagar, no Brasil.
