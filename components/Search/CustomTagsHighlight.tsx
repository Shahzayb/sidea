import ReactDOMServer from 'react-dom/server';
import { connectHighlight } from 'react-instantsearch-dom';
import { HighlightProps } from 'react-instantsearch-core';
import { Box, Chip } from '@material-ui/core';

const Highlight = ({ highlight, hit }: Omit<HighlightProps, 'attribute'>) => {
  const parsedHit = (highlight({
    highlightProperty: '_highlightResult',
    attribute: 'tags',
    hit,
  }) as any) as { value: string; isHighlighted: boolean }[][];

  const tagsHtml = parsedHit.map((tag, index) => {
    const _tag = tag.map((part, innerIndex) => {
      return part.isHighlighted ? (
        <mark
          key={innerIndex}
          dangerouslySetInnerHTML={{ __html: part.value }}
        ></mark>
      ) : (
        <span
          key={innerIndex}
          dangerouslySetInnerHTML={{ __html: part.value }}
        ></span>
      );
    });
    return (
      <Box key={index} mr={1} mb={1}>
        <Chip variant="outlined" color="primary" label={_tag} size="small" />
      </Box>
    );
  });

  const htmlString = ReactDOMServer.renderToString(
    <span style={{ display: 'flex', flexWrap: 'wrap' }}>{tagsHtml}</span>
  );

  return <span dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

const CustomTagsHighlight = connectHighlight(Highlight);

export default CustomTagsHighlight;
