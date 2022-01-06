import { memo } from 'react';

import { Heading } from '@chakra-ui/react';
// タイトルコンポーネント
// 親からtitleとasをpropsで受け取る
// export const TodoTitle = memo(({ title, as }) => {
//   if (as === 'h1') return <h1>{title}</h1>;
//   if (as === 'h2') return <h2>{title}</h2>;

//   return <p>{title}</p>;
// });

export const TodoTitle = memo(({ title, as, fontSize, mt }) => {
  return (
    <Heading mt={mt} as={as} fontSize={fontSize} w="full">
      {title}
    </Heading>
  );
});
