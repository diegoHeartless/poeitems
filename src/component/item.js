import React, {useEffect, useState} from "react";
import Input from "antd/es/input";
import Button from "antd/es/button";
import {saveAsPng} from "save-html-as-image";
import axios from "axios";
import Card from "antd/es/card";
import Checkbox from "antd/es/checkbox";
import Upload from "antd/es/upload";
import {UploadOutlined} from "@ant-design/icons";

export default function OneItem(props) {
    const [result, setResult] = useState({});
    const onChange = (e) => {
        console.log(result)
        console.log(e.target.getAttribute('propname'))
        let temp = {[e.target.getAttribute('propname')]: e.target.value}
        console.log(temp)
        setResult({...result, [e.target.getAttribute('propname')]: e.target.value});
        console.log(result)
    }
    const [paramlist, setParamlist] = useState([]);
    const [corrupt, setCorrupt] = useState(false);
    const [imgfile, setImgfile] = useState(undefined);
    const [descline, setDescline] = useState([]);
    const [reqparam, setReqparam] = useState([]);
    const [impparam, setImpparam] = useState([]);
    const [impEnable, setImpEnable] = useState(false);
    const [magicparamlist, setMagicparamlist] = useState([]);

    useEffect(() => {
        console.log(props)
      setResult(props)

    }, [props]);

    const ViewParams = () => {
        var res = [];
        console.log('ViewParams '+JSON.stringify(result))
        Object.keys(result).filter(r=>r.startsWith('param')).forEach((param) => {
            res.push(
                <div>
                    {result[param]}: <em className="tc -value"><em
                    className="tc -mod">{result[param + 'value']}</em></em>
                </div>
            )
        })

        console.log(res)
        return res
    };

    const ViewMagicParams = () => {
        var res = [];

        //  for (let i = 0; i < magicparamlist; i++) {
        Object.keys(result).filter(r=>r.startsWith('magicparam')).forEach((par) => {
            console.log('res2' + magicparamlist)
            res.push(
                <div>
                    <em className="tc -value"><em className="tc -mod">{result[par]}</em></em>
                </div>
            )

        })

        return res
    };

    const ImpMagicParams = () => {
        var res = [];

        //  for (let i = 0; i < magicparamlist; i++) {
        Object.keys(result).filter(r=>r.startsWith('impparam')).forEach((par) => {
            console.log('res2' + magicparamlist)
            res.push(
                <div>
                    <em className="tc -value"><em className="tc -mod">{result[par]}</em></em>
                </div>
            )

        })

        return res
    };
    const ViewDesc = () => {
        var res = [];

        //  for (let i = 0; i < descline; i++) {
        Object.keys(result).filter(r=>r.startsWith('desc')).forEach((par) => {
            res.push(
                <div>
                    {result[par]}
                </div>
            )
        })
        console.log(res)
        return res
    };

    const ReqParams = () => {
        var res = [];

        Object.keys(result).filter(r=>r.startsWith('reqparam')).forEach((param) => {
            res.push(
                <span>
                , <em className="tc -value"><em className="tc -value">{result[param]}</em></em> {result[param+'value']}
                </span>
            )
        })

        console.log(res)
        return res
    };


    // const [paramlist, setParamlist] = useState(1);
    const propsph = {
        name: 'file',
        //  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
                if (info.fileList[0]?.originFileObj) {
                    setImgfile(URL.createObjectURL(info.fileList[0].originFileObj))
                }
            }
        },
    };

    const saveimg = () => {
        let test = document.getElementById('item');
        console.log(test)
        saveAsPng(test, {}, {pixelRatio: 10})
    }

    const sendToBack = () => {
        const data = {
            method: 'get',
            url: 'test1',
            baseURL: 'http://localhost:8080',

        }
        axios(data).then(result => {
            setResult(result.data)
        }).catch(e => {

        })
    }


    return (
        <div >
            <div style={{display: 'flex'}}>
                <div id="item" >
               <span className="item-box -unique" style={{left: '50px'}}><span className="header -double">
        <span className="symbol"></span>
                   {result.name}
                   <br/>
                   {result.type}
                   <span className="symbol"></span>
      </span>
          <span className="item-stats">
              <span className="group">
                  Quality: <em className="tc -mod"> {result.quality}</em>
                  <br/>
                  {ViewParams()}
              </span>
              <span
                  className="group">Requires Level <em className="tc -value"><em className="tc -value">{result.lvl}</em></em> {ReqParams()}
              </span>
              {impEnable ? <span className="group tc -mod">
                 {ImpMagicParams()}
                  {/*      {corrupt ? <em className="tc -corrupted">Corrupted</em> : ''}*/}
              </span> :''}
              <span className="group tc -mod">
                 {ViewMagicParams()}
                  {corrupt ? <em className="tc -corrupted">Corrupted</em> : ''}
              </span>
              <span className="group tc -flavour">
                  {ViewDesc()}
              </span>
          </span>
                   <span
                       className="images"><a

                       className="image"><img alt="You Amazing picture.png"
                                              src={imgfile}
                                              decoding="async" width="156" height="234"
                                              data-image-name="Iron Heart inventory icon.png"
                                              data-image-key="Iron_Heart_inventory_icon.png"/>
                       </a>
                   </span>
               </span>
                </div>
            </div>

        </div>
    );
}