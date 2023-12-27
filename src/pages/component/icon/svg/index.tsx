import { Card, Divider, Popover, List, Tag } from 'antd';
import IconSvg from '@/components/IconSvg';
import styles from './index.module.less';

const svgIcons: any = [
  'home',
  'set',
  'user',
  'pwd',
  'permissions',
  'message',
  'tick',
  'theme',
  'refresh',
  'more',
  'language-outline',
  'icon',
  'editor',
  'edit',
  'detail',
  'control',
  'close',
  'arrow-down',
  'arrow-left',
  'arrow-right',
  'arrow-left2',
  'arrow-right2',
  'page',
  'list',
];

function App() {
  return (
    <div className='layout-main-conent'>
      <Card bordered={false}>
        <div>
          {svgIcons.map((item: any) => (
            <div className={styles.list} key={item}>
              <Popover content={`<IconSvg type="${item}" />`}>
                <div>
                  <IconSvg name={item} style={{ fontSize: '30px' }} />
                  <span>{item}</span>
                </div>
              </Popover>
            </div>
          ))}
        </div>
        <Divider />
      </Card>
    </div>
  );
}

export default App;
