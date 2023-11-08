import { styled } from '@storybook/theming';

export const Icon = styled.span(
  ({ indicator, useIcon }: { indicator: string, useIcon: boolean }) => ({
    borderRadius: '100%',
    display: 'block',
    height: '36px',
    width: '36px',
    background:  useIcon ? 'none' : indicator,
    backgroundImage: useIcon ? `url(${indicator})` : 'none',
    backgroundSize: '100%'
  }),
);
