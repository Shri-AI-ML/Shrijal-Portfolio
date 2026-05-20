import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Calendar, Clock, Terminal, ChevronDown, ChevronUp, Cpu, Heart } from 'lucide-react';

const ResearchLogs = () => {
  const [expandedLog, setExpandedLog] = useState(null);

  const logs = [
    {
      id: "log_1",
      title: "Optimizing Dense-Sparse Retrieval Coefficients in ChromaDB",
      date: "May 14, 2026",
      readTime: "4 min read",
      category: "Retrieval Systems",
      summary: "A practical investigation into linear combination weights (alpha) for hybrid search systems, balancing exact keywords against semantic contexts.",
      details: "In production pipelines, dense vector search often struggles to fetch exact codes (e.g., function names like 'get_experience'). By combining BM25 sparse queries with Dense Sentence-Transformer cosine distances, we achieve a hybrid score:\n\nScore = α * DenseScore + (1 - α) * SparseScore\n\nI evaluated various values of α from 0.0 to 1.0. Results showed that α = 0.65 yielded the optimal Mean Reciprocal Rank (MRR) of 0.84 on clinical document datasets, successfully capturing semantic intents while preserving technical keyword overrides.",
      code: `def hybrid_score(dense_rank: float, sparse_rank: float, alpha: float = 0.65) -> float:
    # Scale scores between [0, 1]
    norm_dense = normalize_cosine(dense_rank)
    norm_sparse = normalize_bm25(sparse_rank)
    
    # Compute combined weight
    return (alpha * norm_dense) + ((1 - alpha) * norm_sparse)

# Yields 15% lower retrieval error rates on raw logs`
    },
    {
      id: "log_2",
      title: "Stacking Generalization: Combining XGBoost and RF for Diagnostic Generalization",
      date: "April 28, 2026",
      readTime: "6 min read",
      category: "Machine Learning",
      summary: "Exploring cross-validated stacked generalization strategies to build highly robust medical prediction engines that don't overfit.",
      details: "While XGBoost performs exceptionally well on tabular datasets, it is prone to local overfitting. To bypass this, I implemented a Stacking generalizer on the UCI Heart Disease set. Level-0 classifiers (Random Forest, XGBoost, Logistic Regression) generate probabilities. These probabilities serve as features for a Level-1 meta-learner (Logistic Regression).\n\nUsing 5-fold Stratified Cross-Validation, the stack achieved an accuracy of 89.13% and a 0.94 ROC-AUC score, outperforming single models by 2.4%.",
      code: `from sklearn.ensemble import StackingClassifier
from sklearn.linear_model import LogisticRegression
from xgboost import XGBClassifier

estimators = [
    ('rf', RandomForestClassifier(n_estimators=100, random_state=42)),
    ('xgb', XGBClassifier(use_label_encoder=False, eval_metric='logloss'))
]

# Logistic regression generalizes the prediction boundaries
stack = StackingClassifier(
    estimators=estimators, 
    final_estimator=LogisticRegression(),
    cv=5
)`
    },
    {
      id: "log_3",
      title: "Reducing Token Overheads via Dynamic Chunk Sizing in LangChain",
      date: "March 15, 2026",
      readTime: "3 min read",
      category: "Generative AI",
      summary: "How configuring overlap ratios and implementing semantic splitters reduces Groq LLM token consumption by 30%.",
      details: "Traditional character-based splitters break sentences mid-thought, leading to weak retrieval context and redundant chunk overlays. I migrated our indexing stack to a RecursiveCharacterTextSplitter configured to 500 characters with 100 character overlap. Additionally, I set up context metadata injection. This allows our FastAPI engine to only feed relevant sections to the Groq LLM API, reducing overall prompt token count by 32% and accelerating API response speeds.",
      code: `# Optimal chunking schema for document processing
splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=100,
    separators=["\\n\\n", "\\n", " ", ""]
)

# Prevents breaking down structured lists in technical resume PDFs`
    }
  ];

  const handleToggle = (id) => {
    setExpandedLog(expandedLog === id ? null : id);
  };

  return (
    <section id="research-logs" className="py-16 md:py-24 border-t border-zinc-900 relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 border border-zinc-800 bg-zinc-950 px-3 py-1 rounded-full text-xs text-zinc-400 font-mono mb-4">
            <BookOpen className="h-3.5 w-3.5 text-purple-400" />
            <span>/system/research_logs</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            RESEARCH & BUILD LOGS
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto font-mono">
            Detailed engineering investigations, performance benchmarks, and diagnostic research.
          </p>
        </div>

        {/* Logs List */}
        <div className="space-y-6">
          {logs.map((log) => {
            const isExpanded = expandedLog === log.id;
            return (
              <div 
                key={log.id} 
                className="glass-panel border border-zinc-900 rounded-xl overflow-hidden hover:border-zinc-800/80 transition-all"
              >
                {/* Clickable Header */}
                <div 
                  onClick={() => handleToggle(log.id)}
                  className="p-6 flex items-start justify-between gap-6 cursor-pointer select-none"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                      <span className="text-purple-400">{log.category}</span>
                      <span className="text-zinc-600 flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" /> {log.date}
                      </span>
                      <span className="text-zinc-600 flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {log.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight hover:text-purple-400 transition-colors">
                      {log.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-3xl">
                      {log.summary}
                    </p>
                  </div>
                  
                  <div className="text-zinc-500 shrink-0 mt-1">
                    {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </div>
                </div>

                {/* Expandable Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden border-t border-zinc-900 bg-zinc-950/20"
                    >
                      <div className="p-6 space-y-6 text-sm text-zinc-400 leading-relaxed font-normal">
                        
                        {/* Text explanation */}
                        <div className="whitespace-pre-line">
                          {log.details}
                        </div>

                        {/* Code Box */}
                        <div className="p-4 bg-[#030303] border border-zinc-900 rounded-lg space-y-2.5">
                          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-wider border-b border-zinc-900 pb-2">
                            <div className="flex items-center gap-1.5">
                              <Terminal className="h-3.5 w-3.5 text-purple-400" />
                              <span>python code snippet</span>
                            </div>
                            <span>Active implementation</span>
                          </div>
                          <pre className="text-xs font-mono text-purple-200 overflow-x-auto p-1 leading-normal">
                            <code>{log.code}</code>
                          </pre>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ResearchLogs;
