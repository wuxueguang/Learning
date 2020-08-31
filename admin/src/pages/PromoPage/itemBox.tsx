import React, { Component } from 'react';
import { formatVideoTime, formatTagline } from '@/utils/formatter';
import './index.scss';

interface ItemBoxProps {
  data: any;
}

interface ItemBox {
  props: ItemBoxProps;
}

class ItemBox extends Component {
  constructor(props: ItemBoxProps) {
    super(props);
  }

  render() {
    const { data } = this.props;
    const title = formatTagline(data.name, 20);
    const tags = data.tags.slice(0, 1);

    return (
      <div className="promo-item-box">
        <div className="promo-box-thumbnail">
          <img src={data.thumbnail} />
        </div>
        <div className="promo-overlay">
          {
            tags.map((item, index) => (
              <div className="box-tag" key={`tag-${index}`}>
                <span>{item}</span>
              </div>
            ))
          }
        </div>
        <div className="item-duration">
          <span>{formatVideoTime(data.duration)}</span>
        </div>
        <div className="item-info" >
          <div className="item-tagline">{title}</div>
          <div className="item-duration-price">
            ¥{data.price}
          </div>
        </div>
      </div>
    )
  }
}

export default ItemBox;