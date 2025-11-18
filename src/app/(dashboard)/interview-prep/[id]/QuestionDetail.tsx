import { CheckCircle, AlertTriangle } from "lucide-react";

interface QuestionDetailProps {
  goodAnswer: {
    structure: string;
    keyPoints: string[];
    example: string;
  };
  badAnswer: {
    examples: string[];
    whyBad: string[];
  };
}

export default function QuestionDetail({ goodAnswer, badAnswer }: QuestionDetailProps) {
  return (
    <>
      {/* Good Answer Section */}
      <div className="bg-cv-success/5 border border-cv-success/20 rounded-lg p-6">
        <h4 className="text-cv-success font-semibold mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />✅ Panduan
          Jawaban yang Baik
        </h4>

        <div className="space-y-4">
          <div>
            <h5 className="text-cv-text-primary font-medium mb-2">
              Struktur Jawaban:
            </h5>
            <p className="text-cv-text-secondary text-sm">
              {goodAnswer.structure}
            </p>
          </div>

          <div>
            <h5 className="text-cv-text-primary font-medium mb-2">
              Poin-poin Kunci:
            </h5>
            <ul className="space-y-1">
              {goodAnswer.keyPoints.map(
                (point, pointIndex) => (
                  <li
                    key={pointIndex}
                    className="flex items-start gap-2 text-cv-text-secondary text-sm"
                  >
                    <CheckCircle className="w-3 h-3 text-cv-success mt-0.5 flex-shrink-0" />
                    {point}
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h5 className="text-cv-text-primary font-medium mb-2">
              Contoh Jawaban:
            </h5>
            <div className="bg-cv-bg-secondary/50 border border-cv-text-secondary/20 rounded p-3">
              <p className="text-cv-text-secondary text-sm italic">
                "{goodAnswer.example}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bad Answer Section */}
      <div className="bg-cv-error/5 border border-cv-error/20 rounded-lg p-6">
        <h4 className="text-cv-error font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />❌ Contoh
          Jawaban yang Harus Dihindari
        </h4>

        <div className="space-y-4">
          <div>
            <h5 className="text-cv-text-primary font-medium mb-2">
              Contoh Jawaban Buruk:
            </h5>
            <ul className="space-y-2">
              {badAnswer.examples.map(
                (example, exampleIndex) => (
                  <li
                    key={exampleIndex}
                    className="bg-cv-bg-secondary/50 border border-cv-error/20 rounded p-2"
                  >
                    <p className="text-cv-text-secondary text-sm italic">
                      "{example}"
                    </p>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h5 className="text-cv-text-primary font-medium mb-2">
              Mengapa Jawaban Ini Buruk:
            </h5>
            <ul className="space-y-1">
              {badAnswer.whyBad.map(
                (reason, reasonIndex) => (
                  <li
                    key={reasonIndex}
                    className="flex items-start gap-2 text-cv-text-secondary text-sm"
                  >
                    <AlertTriangle className="w-3 h-3 text-cv-error mt-0.5 flex-shrink-0" />
                    {reason}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
