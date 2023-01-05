import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { kakaoApiKey } from "../store/apiKey";
import { UserContext } from "../store/UserContext";

import { Average_Algorithm } from "../util/Mid_Algorithm";

export default function MapContainer({ searchPlace }) {
  const userCtx = useContext(UserContext);

  const RegionCode = {
    subway: "SW8",
  };

  var userInfo = [];
  var centerInfo = [];
  var subwayInfo = [];
  const [centerAddress,setCenterAddress] = useState();
  const [centerLatLng,setCenterLatLng] = useState();
  const [constructMap,setConstructMap] = useState();
  const [list, setList] = useState([]); // 중간 지점 근처 만날 장소 리스트
  var map;

  useEffect(() => {
    if (centerAddress){
      if(centerLatLng){
        if(map){
          map.setCenter(centerLatLng);
        }
      }

    }
  },[centerAddress,centerLatLng,constructMap])

  useEffect(() => {
    if(list.length===0){
      return;
    }
    subwayInfo = [...list];
    console.log('list:',subwayInfo);

  },[list])

  useEffect(() => {
    window.kakao.maps.load(() => {
      async function MapSetting() {
        const mapContainer = document.getElementById("kakaoMap");
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        map = new window.kakao.maps.Map(mapContainer, mapOption);


        function userHandler() {
          //유저들 위치 정보 표시
          function getMarkers() {
            userCtx.users.map((user) => {
    
              const x = parseFloat(user.info.x);
              const y = parseFloat(user.info.y);
              centerInfo.push([y, x]);
              userInfo.push({
                name: user.name,
                region: user.region,
                latlng: new window.kakao.maps.LatLng(y, x),
                content: `<div style="font-color:black;border-radius:10px;opacity:0.8;font-size:10px;background-color:white;width:50px;padding:5px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">${user.name}</div>`,
              });
            });
          }
          getMarkers();

          // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
          var bounds = new window.kakao.maps.LatLngBounds();

          for (var i = 0; i < userInfo.length; i++) {
            // 배열의 좌표들이 잘 보이게 마커를 지도에 추가합니다
            var marker = new window.kakao.maps.Marker({
              position: userInfo[i].latlng,
            });
            marker.setMap(map);

            var overlay = new window.kakao.maps.CustomOverlay({
              content: userInfo[i].content,
              map: map,
              position: userInfo[i].latlng,
            });
            overlay.setMap(map);

            // LatLngBounds 객체에 좌표를 추가합니다
            bounds.extend(userInfo[i].latlng);
          }

          // function setBounds() {
          //   // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
          //   // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다
          //   map.setBounds(bounds);
          //   console.log('setBound',map.getCenter())
            
          //   console.log('centerlatlng',centerLatLng);
          // }
          // setBounds();

          return;
        }

        async function centerControl() {
          var centerCoord = await Average_Algorithm(centerInfo);
          setCenterLatLng(() => new window.kakao.maps.LatLng(
            centerCoord.x,
            centerCoord.y
          ))

          async function CoordsToAddress(coords) {
            window.kakao.maps.load(() => {
              var geocoder = new window.kakao.maps.services.Geocoder();
              const coord = new window.kakao.maps.LatLng(coords.x, coords.y);

              geocoder.coord2Address(
                coord.getLng(),
                coord.getLat(),
                (result, status) => {
                  if (status === window.kakao.maps.services.Status.OK) {
                    setCenterAddress(() => result[0].address.address_name); 
                    
                  }
                }
              );
            });
            return;
          }

          function AddressToPlace(code) {
            var ps = new window.kakao.maps.services.Places();
            ps.categorySearch(code, placesSearchCB, {
              radius: 2000,
              location: map.getCenter(),
              sort: window.kakao.maps.services.SortBy.DISTANCE,
            });

            // 키워드 검색 완료 시 호출되는 콜백함수 입니다

            function placesSearchCB(data, status, pagination) {
              if (status === window.kakao.maps.services.Status.OK) {
                let datas = []
                for (var i = 0; i < data.length; i++) {
                  datas.push(data[i])
                }
                setList(() => datas);
              } else {
                console.log("addresstoplace error");
              }
            }
            return;
          }


          CoordsToAddress(centerCoord); // center 좌표를 주소로 변환 centerAddress
          AddressToPlace(RegionCode.subway); //이 주소에서 가장 가까운 지하철 찾기

    
        }
        userHandler();
        centerControl();
      }
      MapSetting();
    });
  },[]);

  return (
    <div
      id="kakaoMap"
      style={{
        width: "100%",
        height: "450px",
        zIndex: 1,
      }}
    ></div>
  );
}
