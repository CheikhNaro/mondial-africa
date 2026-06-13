import { useEffect } from 'react';

export default function CursorFollower() {
  useEffect(() => {
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;
    let cursor;
    import('cursor-effects').then(({ followingDotCursor }) => {
      cursor = new followingDotCursor({ color: '#7C87F0', zIndex: '100' });
    }).catch(() => {});
    return () => {
      if (cursor) cursor.destroy();
    };
  }, []);

  return null;
}
