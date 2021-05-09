import React, { createContext, FunctionComponent, ReactNode, useRef, useState } from 'react';

import { debounce } from '../utils/common';

export type UpdateBlurImage = (image: string) => void;
export type BlurImage = string;
export type UIContext = {
  blurImage: BlurImage;
  updateBlurImage: UpdateBlurImage;
};

const defaultContext: UIContext = {
  blurImage: '',
  updateBlurImage: () => '',
};

export const UIStateContext = createContext<UIContext>(defaultContext);

export type ProviderProps = {
  children: ReactNode;
};

const UIStateProvider: FunctionComponent<ProviderProps> = ({ children }) => {
  const [blurImage, setBlurImage] = useState<BlurImage>(defaultContext.blurImage);
  const updateBlurImageRef = useRef(debounce((image: string) => setBlurImage(image), 350));

  const updateBlurImage = (image: string) => updateBlurImageRef.current(image);

  return <UIStateContext.Provider value={{ blurImage, updateBlurImage }}>{children}</UIStateContext.Provider>;
};

export default UIStateProvider;
