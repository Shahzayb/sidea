import ReactDOMServer from 'react-dom/server';
import { connectHighlight } from 'react-instantsearch-dom';
import { HighlightProps } from 'react-instantsearch-core';

const Highlight = ({ highlight, attribute, hit }: HighlightProps) => {
  const parsedHit = highlight({
    highlightProperty: '_highlightResult',
    attribute,
    hit,
  });

  const html = (
    <>
      {parsedHit.map((part, index) =>
        part.isHighlighted ? (
          <mark
            key={index}
            dangerouslySetInnerHTML={{ __html: part.value }}
          ></mark>
        ) : (
          <span
            key={index}
            dangerouslySetInnerHTML={{ __html: part.value }}
          ></span>
        )
      )}
    </>
  );

  const htmlString = ReactDOMServer.renderToStaticMarkup(html);

  return <span dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

const CustomHighlight = connectHighlight(Highlight);

export default CustomHighlight;
