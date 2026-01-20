"use client";

import { useEffect, useState } from "react";
import KbCreate from "./kbcreate";
import KbEdit from "./kbedit";

type Section = {
  heading: string;
  body: string;
};

type Article = {
  title: string;
  description: string;
  sections: Section[];
};

export default function KbBody() {
  const [article, setArticle] = useState<Article | null>(null);
  const [mode, setMode] = useState<"view" | "edit" | "create">("view");

  // Load dummy article
  useEffect(() => {
    async function loadArticle() {
      const res = await fetch("/JSON/sample-article.json");
      const data = await res.json();
      setArticle(data);
    }

    loadArticle();
  }, []);

  // Save handler for create/edit
  const handleSave = (newArticle: Article) => {
    setArticle(newArticle);
    setMode("view");
  };

  // Cancel handler
  const handleCancel = () => {
    setMode("view");
  };

  return (
    <div className="kb-body">
      {/* MODE: VIEW */}
      {mode === "view" && (
        <>
          {!article ? (
            <p>Loading article...</p>
          ) : (
            <div className="article">
              <h2>{article.title}</h2>
              <p className="description">{article.description}</p>

              {article.sections.map((sec, i) => (
                <div key={i} className="section">
                  <h3>{sec.heading}</h3>
                  <p className="section-body">{sec.body}</p>
                </div>
              ))}
            </div>
          )}

          <div className="actions">
            <button onClick={() => setMode("edit")}>Edit Article</button>
            <button onClick={() => setMode("create")}>Create New Article</button>
          </div>
        </>
      )}

      {/* MODE: EDIT */}
      {mode === "edit" && article && (
        <KbEdit article={article} onSave={handleSave} onCancel={handleCancel} />
      )}

      {/* MODE: CREATE */}
      {mode === "create" && (
        <KbCreate onSave={handleSave} onCancel={handleCancel} />
      )}

      <style jsx>{`
        .kb-body {
          flex: 1;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          background: white;
        }

        .article h2 {
          margin-bottom: 1rem;
        }

        .section {
          margin-top: 1rem;
        }

        .actions {
          display: flex;
          gap: 1rem;
        }

        button {
          padding: 0.5rem 1rem;
          background: #4f46e5;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          background: #4338ca;
        }

        h2 {
          font-size: 1.5rem;
          font-weight: 600;
        }
        
        h3 {
          font-size: 1.25rem;
          font-weight: 600;
        }
        
        .description {
          font-size: 1rem;
          font-weight: 500;
        }
        
        .section-body {
          font-size: 0.75rem;
          font-weight: 400;
        }
      `}</style>
    </div>
  );
}