export function LessonContent({ content }: { content: string }) {
  const blocks = content.split(/\n\n+/);
  return (
    <div className="space-y-4 leading-relaxed text-ck-text">
      {blocks.map((block, i) => {
        if (block.startsWith("## ")) {
          return (
            <h3 key={i} className="!mt-6 font-display text-lg font-bold text-violet-500">
              {block.replace(/^##\s*/, "")}
            </h3>
          );
        }
        return (
          <p key={i} className="text-[15px]">
            {block}
          </p>
        );
      })}
    </div>
  );
}
