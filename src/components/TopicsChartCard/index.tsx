import React, { useRef, useState, useMemo } from 'react';
import { Spin, Card, Tag, Divider, Row, Col } from 'antd';
import useEcharts, { EChartsOption } from '@/hooks/useEcharts';


import styles from '@/assets/css/index.module.less';
import { TopicsChartDataType } from '@/apis/models/data';
import { ResponseData } from '@/utils/request';
import { monthnewTopics } from '@/apis/services/PageService';

const topicsChartOption: EChartsOption = {
  tooltip: {},
  grid: {
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
  },
  xAxis: {
    show: false,
    data: [
      /* '03-01','03-02','03-03','03-04','03-05','03-06','03-07','03-08','03-09','03-10','03-11','03-12','03-13','03-15','03-15','03-16','03-17','03-18','03-19','03-20','03-21','03-22','03-23','03-24','03-25','03-26','03-27','03-28','03-29','03-30' */
    ],
  },
  yAxis: {
    show: false,
  },
  series: [
    {
      name: 'Bài viết',
      type: 'line',
      data: [
        /* 23,60,20,36,23,85,23,60,20,36,23,85,23,60,20,36,23,85,23,60,20,36,23,85,23,60,20,36,23,85 */
      ],
      lineStyle: {
        width: 3,
        color: {
          type: 'linear',
          colorStops: [
            {
              offset: 0,
              color: '#A9F387', 
            },
            {
              offset: 1,
              color: '#48D8BF',
            },
          ],
          globalCoord: false,
        } as any,
        shadowColor: 'rgba(72,216,191, 0.3)',
        shadowBlur: 10,
        shadowOffsetY: 20,
      },
      itemStyle: {
        borderWidth: 6,
        borderColor: '#A9F387',
        color: '#48D8BF',
      },
      smooth: true,
    },
  ],
};

const WorksChartCard: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [visitData, setVisitData] = useState<TopicsChartDataType>({
    total: 0,
    num: 0,
    chart: {
      day: [],
      num: [],
    },
  });

  const total = useMemo(() => visitData.total, [visitData]);
  const num = useMemo(() => visitData.num, [visitData]);

  const topicsChartRef = useRef<HTMLDivElement>(null);

  useEcharts(topicsChartRef, topicsChartOption, async (chart) => {
    setLoading(true);
    try {
      const response: ResponseData<TopicsChartDataType> = await monthnewTopics();
      const { data } = response;
      const vData = {
        total: data?.total || 0,
        num: data?.num || 0,
        chart: data?.chart || {
          day: [],
          num: [],
        },
      };
      setVisitData(vData);

      const option: EChartsOption = {
        xAxis: {
          data: vData.chart.day,
        },
        series: [
          {
            name: 'Bài viết',
            data: vData.chart.num,
          },
        ],
      };
      chart.setOption(option);
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  });

  return (
    <Spin spinning={loading} size='large'>
      <Card
        className={styles.homeBoxCard}
        title={'Số lượng bài viết'}
        extra={<Tag color='warning'>{'Tháng'}</Tag>}
      >
        <div className={styles.num}>{num?.toLocaleString()}</div>
        <div className={styles.height40} ref={topicsChartRef} />
        <Divider />
        <Row>
          <Col span={12}>{'Tổng'}</Col>
          <Col className='text-align-right' span={12}>
            {total?.toLocaleString()}
          </Col>
        </Row>
      </Card>
    </Spin>
  );
};

export default WorksChartCard;
