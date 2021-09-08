import React from 'react';

import {
  Container
} from './styles';

interface BulletProps {
  isActive?: boolean;
}

export function Bullet({isActive= false } : BulletProps){
  return (
    <Container isActive={isActive}/>
  );
}
