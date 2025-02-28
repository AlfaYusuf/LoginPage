import { Col, Row } from 'antd';
import { FC, useEffect, useState } from 'react';
import {CloseOutlined,CheckCircleOutlined,CloseCircleOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
import React from 'react';


interface StickyTextProps {
  display?: boolean;
  sticky_type?: string;
  sticky_title?: string;
  sticky_message?: string;
  sendData: (value: boolean) => void;
}

const StickyText: FC<StickyTextProps> = ({
  display = false,
  sticky_type,
  sticky_title,
  sticky_message,
  sendData,
}) => {
  const [isVisible, setIsVisible] = useState(display);

  useEffect(() => {
    setIsVisible(display);

    if (!display) {
      sendData(false);
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [display, sendData]);

  const handleClose = () => {
    setIsVisible(false);
    sendData(false);
  };

  let mystyle = {};
  let antIconStyle = { color: '#fff' };
  let icon = <></>;

  switch (sticky_type) {
    case 'warning':
      mystyle = { background: '#ff1010' };
      icon = <ExclamationCircleOutlined style={antIconStyle} />;
      break;
    case 'Validation':
      mystyle = { background: '#5776b5' };
      icon = <ExclamationCircleOutlined style={antIconStyle} />;
      break;
    case 'success':
      mystyle = { background: '#16c900' };
      icon = <CheckCircleOutlined style={antIconStyle} />;
      break;
    case 'error':
      mystyle = { background: '#ff1010' };
      icon = <CloseCircleOutlined style={antIconStyle} />;
      break;
    default:
      break;
  }

  return isVisible ? (
    <div className="sticky">
      <div style={mystyle} className="stickyBody">
        <Row gutter={16}>
          <Col span={3} className="stickyIcon" style={{ margin: '0px !important' }}>
            {icon}
          </Col>
          <Col span={18} className="stickyMessage" style={{ margin: '0px !important' }}>
            {sticky_message}
          </Col>
          <Col span={3} style={{ margin: '0px !important' }}>
            <CloseOutlined onClick={handleClose} />
          </Col>
        </Row>
      </div>
    </div>
  ) : null;
};

export default StickyText;
