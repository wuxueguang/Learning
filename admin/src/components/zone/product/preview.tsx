import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Row, Col, Radio, Checkbox } from "antd";
import { PreviewState } from "@/reducers/preview";
import RadioGroup from "antd/lib/radio/group";
import { PreviewAction } from "@/actions/preview";
import { PreviewTypes } from "@/types";
import { ZonesState } from "@/reducers/zones";

import "./edit.scss";

// const CheckboxGroup = Checkbox.Group;
interface ReduxProps {
  Preview: PreviewState;
  Zones: ZonesState;
  dispatch: Dispatch<any>;
}
interface PreviewModalProps {
  onChangePreview: any;
}
interface PreviewModal {
  props: PreviewModalProps & ReduxProps;
  state: {
    preview_id: string;
    cover_pic_id: string;
    epilogue_id: string;
  };
}

@(connect<{}, {}, {}, { Preview: PreviewState; Zones: ZonesState }>(
  ({ Preview, Zones }) => ({ Preview, Zones }),
  dispatch => ({ dispatch })
) as any)
class PreviewModal extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      preview_id: '',
      cover_pic_id: '',
      epilogue_id: ''
    };
  }
  preview: any;
  cover_pic: any;
  async onScroll(target) {
    const per = 10;
    switch (target) {
      case "preview":
        if (
          this.props.Preview.previewpagi!.current_page >=
          this.props.Preview.previewpagi!.total_page
        )
          return;
        this.preview = document.querySelector(
          ".veer-offline-productsetting-preview-preview"
        );
        const { scrollTop, clientHeight, scrollHeight } = this.preview;
        if (scrollTop + clientHeight >= scrollHeight) {
          this.props.dispatch(
            await PreviewAction.getpreview(
              per,
              this.props.Preview.previewpagi!.current_page + 1
            )
          );
        }
        break;
      case "epilogue":
          if (
            this.props.Preview.epiloguepagi!.current_page >=
            this.props.Preview.epiloguepagi!.total_page
          )
            return;
          // const { scrollTop, clientHeight, scrollHeight } = this.preview;
          if (scrollTop + clientHeight >= scrollHeight) {
            this.props.dispatch(
              await PreviewAction.getEpilogue(
                per,
                this.props.Preview.epiloguepagi!.current_page + 1
              )
            );
          }
          break;
      case "cover_pic":
        if (
          this.props.Preview.coverpicpagi!.current_page >=
          this.props.Preview.coverpicpagi!.total_page
        )
          return;
        this.cover_pic = document.querySelector(
          ".veer-offline-productsetting-preview-coverpic"
        );
        const scrollTop1 = this.cover_pic.scrollTop;
        const clientHeight1 = this.cover_pic.clientHeight;
        const scrollHeight1 = this.cover_pic.scrollHeight;
        if (scrollTop + clientHeight >= scrollHeight) {
          this.props.dispatch(
            await PreviewAction.getpreview(
              per,
              this.props.Preview.previewpagi!.current_page + 1
            )
          );
        }
        break;
      default:
        break;
    }
  }
  componentDidMount() {
    this.setState({
      cover_pic_id:
        this.props.Zones.zone &&
        this.props.Zones.zone.relationships &&
        this.props.Zones.zone.relationships.cover_pic.id,
      preview_id:
        this.props.Zones.zone &&
        this.props.Zones.zone.relationships &&
        this.props.Zones.zone.relationships.preview.id,
      epilogue_id: this.props.Zones.zone &&
        this.props.Zones.zone.relationships &&
        this.props.Zones.zone.relationships.epilogue.id,
    });
  }

  
  setEpilogue = (e) => {
    const { onChangePreview } = this.props;
    const value = e.target.value;
    if (value === this.state.epilogue_id) {
      this.setState({
        epilogue_id: '',
      });
      onChangePreview("epilogue_id", '-');
    } else {
      this.setState({
        epilogue_id: value,
      });
      onChangePreview("epilogue_id", value);
    }
  }

  render() {
    const { preview, coverpic, epilogue } = this.props.Preview;
    const { Zones, onChangePreview } = this.props;
    const { epilogue_id } = this.state;
    const colPreview = (arr: PreviewTypes.PreviewInfo[], isCheckbox?: boolean) => {
      if (arr.length === 0) return;

      return arr.map(val => {
        return (
          <Col key={val.id}>
            <img
              src={(val.asset_type === "preview" || val.asset_type === "epilogue")? val.img : val.file}
              className="veer-offline-productsetting-preview-bac"
            />
            <p className="veer-offline-productsetting-preview-title">
              {val.name}
            </p>
            { isCheckbox ? (<Checkbox onChange={this.setEpilogue} checked={val.id === epilogue_id} value={val.id} />) : (
              <Radio value={val.id} />
            )}
          </Col>
        );
      });
    };
    return (
      <div className="veer-offline-productsetting-preview">
        <div>
          <h4 className="veer-offline-productsetting-preview-videotitle">
            引导视频
          </h4>
          <Row
            gutter={25}
            style={{ maxHeight: "266px", overflow: "auto" }}
            onScrollCapture={this.onScroll.bind(this, "preview")}
            className="veer-offline-productsetting-preview-preview"
          >
            <RadioGroup
              defaultValue={
                Zones.zone &&
                Zones.zone.relationships &&
                Zones.zone.relationships.preview.id
              }
              onChange={e => {
                onChangePreview("preview_id", e.target.value);
              }}
            >
              {colPreview(preview)}
            </RadioGroup>
          </Row>
        </div>
        <div>
          <h4 className="veer-offline-productsetting-preview-videotitle">
            片尾视频
          </h4>
          <Row
            gutter={25}
            style={{ maxHeight: "266px", overflow: "auto" }}
            onScrollCapture={this.onScroll.bind(this, "epilogue")}
            className="veer-offline-productsetting-preview-epilogue"
          >
            {colPreview(epilogue, true)}
          </Row>
        </div>
        <div>
          <h4 className="veer-offline-productsetting-preview-imgtitle">
            引导图
          </h4>
          <Row
            gutter={25}
            style={{ maxHeight: "266px", overflow: "auto" }}
            onScrollCapture={this.onScroll.bind(this, "cover_pic")}
            className="veer-offline-productsetting-preview-coverpic"
          >
            <RadioGroup
              defaultValue={
                Zones.zone &&
                Zones.zone.relationships &&
                Zones.zone.relationships.cover_pic.id
              }
              onChange={e => {
                onChangePreview("cover_pic_id", e.target.value);
              }}
            >
              {colPreview(coverpic)}
            </RadioGroup>
          </Row>
        </div>
      </div>
    );
  }
}

export default PreviewModal;