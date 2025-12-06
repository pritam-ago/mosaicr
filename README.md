# Mosaicr -- AI-Powered Resume Builder & ATS Analyzer

Mosaicr is a retro-themed, AI-assisted resume builder that allows users
to create, customize, and export ATS-ready resumes.\
The platform includes multiple HTML resume templates, real-time editing,
customization tools, and upcoming ATS scoring features.

------------------------------------------------------------------------

## Features

### Resume Generation

-   Choose from multiple built-in HTML resume templates\
-   Real-time editing with instant preview\
-   Consistent retro UI theme\
-   Editable fields including name, title, summary, skills, etc.\
-   Color customization for text and accent colors

### Resume Editing Panel

-   Two-column layout (left: editor, right: preview)\
-   Save As modal for naming resumes\
-   Download option enabled only after saving\
-   Template cannot be changed after entering the editor

### Template Gallery

-   Displays selectable templates\
-   Clicking a template loads it into the editor\
-   Template previews are rendered using actual HTML templates

### Planned AI/ATS Features

-   ATS resume scoring\
-   Resume improvement suggestions\
-   Keyword matching with job descriptions\
-   AI-generated summaries and bullet points\
-   Job match score calculation

------------------------------------------------------------------------

## Technology Stack

### Frontend

-   Next.js\
-   React\
-   TailwindCSS\
-   Framer Motion

### Backend

-   Node.js\
-   Supabase\
-   Prisma ORM\
-   API routes for resume actions

### Other

-   HTML resume templates\
-   Real-time preview rendering\
-   PDF export functionality (planned)

------------------------------------------------------------------------

## Project Structure

    mosaicr/
    │
    ├── client/                     # Next.js frontend
    │   ├── app/
    │   │   ├── generate/
    │   │   │   ├── general/        # Template gallery + editor
    │   │   │   └── job/            # JD-based resume generation (planned)
    │   │   ├── login/
    │   │   ├── signup/
    │   │   └── page.tsx            # Landing page
    │   │
    │   ├── components/
    │   │   ├── navbar/
    │   │   ├── footer/
    │   │   ├── ResumePreview.tsx
    │   │   └── templates/          # HTML resume templates
    │   │
    │   ├── styles/
    │   └── public/
    │
    └── server/                     # Backend logic
        ├── prisma/
        ├── routes/
        └── controllers/

------------------------------------------------------------------------

## Installation & Setup

### 1. Clone Repository

    git clone https://github.com/yourusername/mosaicr.git
    cd mosaicr

### 2. Install Dependencies

    cd client
    npm install

### 3. Configure Environment Variables

Create `.env.local` inside `/client`:

    NEXT_PUBLIC_SUPABASE_URL=
    NEXT_PUBLIC_SUPABASE_ANON_KEY=
    SUPABASE_SERVICE_ROLE_KEY=
    DATABASE_URL=

### 4. Prisma Setup

    npx prisma generate
    npx prisma migrate dev

### 5. Run Development Server

    npm run dev

------------------------------------------------------------------------

## Key Pages

### Landing Page (`/`)

Retro-themed landing page introducing Mosaicr.

### Template Gallery (`/generate/general`)

Shows all available resume templates.

### Resume Editor (`/generate/general/edit?template=classic`)

Includes: - Editable fields\
- Theme color customization\
- Live preview\
- Save As modal\
- Download PDF (enabled after save)

### Login/Signup

User authentication pages.

------------------------------------------------------------------------

## Contributing

1.  Fork the repository\
2.  Create a branch\
3.  Add commits\
4.  Open a pull request

------------------------------------------------------------------------

## Roadmap

-   AI ATS scoring\
-   Resume → Job Description optimization\
-   Multi-page resume support\
-   User dashboard\
-   Resume version history\
-   Template marketplace\
-   Full PDF export styling

------------------------------------------------------------------------

## License

Licensed under the MIT License.
