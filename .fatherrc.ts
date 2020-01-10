import { IBundleOptions } from 'father';
import { DeepPartial } from './typings';

type FixedIBundleOptions = DeepPartial<IBundleOptions>;

const options: FixedIBundleOptions = {
  cjs: 'rollup',
  esm: 'rollup',
  doc: { typescript: true, title: 'tiny-react-redux使用文档' },
};

export default options;
