import * as React from 'react';
import * as jquery from 'jquery';
import { IDocViewProps } from './IDocViewProps';

export interface localState {
  fileUrl: string;
}

export default class DocView extends React.Component<IDocViewProps, localState> {

  // constructor
  public constructor(props: IDocViewProps) {
    super(props);
    this.setState({
      fileUrl: null
    });
  }

  // extract the incident id from the url
  public retrieveIncidentId() {
    const pageName: string = location.href.split("/").slice(-1)[0];
    const startPos: number = pageName.indexOf('_') + 1;
    const endPos: number = pageName.indexOf('.aspx');
    const incidentId = pageName.substring(startPos, endPos);
    return incidentId;
  }

  // file url retrieval
  public componentDidMount() {
    const reactHandler = this;
    const rootUrl = window.location.origin;
    const fileName = "SafetyIncident_" + this.retrieveIncidentId() + ".docx"
    const libraryName = this.props.docLibraryName;
    const fullUrl = rootUrl + "/sites/apps/_api/web/GetFolderByServerRelativeUrl('" + libraryName + "')/Files('" + fileName + "')";
    jquery.ajax({
      url: fullUrl,
      type: "GET",
      dataType: "json",
      headers: { 'Accept': 'application/json; odata=verbose;' },
      success: (resultData) => {
        reactHandler.setState({
          fileUrl: resultData.d.LinkingUrl
        });
      },
      error: (jqXHR, textStatus, errorThrown) => {
        console.log('jqXHR', jqXHR);
        console.log('text status', textStatus);
        console.log('error', errorThrown);
      }
    });
  }

  // render
  public render(): React.ReactElement<IDocViewProps> {
 
    if (this.state == null) {
      return (
        <div>Loading...</div>
      );
    } else {
         console.log(this.state.fileUrl)
      return (
        <iframe
          src={this.state.fileUrl}
          width="100%"
          height="800px"
        ></iframe>
      );
    }
  }
}
