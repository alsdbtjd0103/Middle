import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { kakaoApiKey } from "../store/apiKey";
import { UserContext } from "../store/UserContext";
import { Centroid_Algorithm,Average_Algorithm } from "../util/Mid_Algorithm";

export default function MapContainer({ searchPlace }) {
  const userCtx = useContext(UserContext);
  var userInfo = [];
  var centerInfo = [];
  var subwayInfo = [];

  useEffect(() => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("kakaoMap");
      const mapOption = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      var map = new window.kakao.maps.Map(mapContainer, mapOption);
      
      async function userHandler(){ //유저들 위치 정보 표시
        async function getMarkers() {
            userCtx.users.map((user) => {
              const x = parseFloat(user.info.x);
              const y = parseFloat(user.info.y);
              centerInfo.push([y,x]);
              userInfo.push({
                name:user.name,
                region: user.region,
                latlng: new window.kakao.maps.LatLng(y,x),
                content:`<div style="font-color:black;border-radius:10px;opacity:0.8;font-size:10px;background-color:white;width:50px;padding:5px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">${user.name}</div>`,
              });
            });
          }
    
          const callGetMarkers = async () => {
            await getMarkers();
          };
    
          callGetMarkers();
          
  
          var center2 = await Average_Algorithm(centerInfo);
    
          console.log(center2)

          userInfo.push({
            name:'center',
            region:'center',
            latlng: new window.kakao.maps.LatLng(center2.x,center2.y),
            content:`<div style="font-color:black;border-radius:10px;opacity:0.8;font-size:10px;background-color:white;width:50px;padding:5px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">center</div>`,
          })
          console.log(userInfo)


    
        // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
        var bounds = new window.kakao.maps.LatLngBounds();    
        
        for (var i = 0; i < userInfo.length; i++) {
            // 배열의 좌표들이 잘 보이게 마커를 지도에 추가합니다
            var marker = new window.kakao.maps.Marker({position : userInfo[i].latlng });
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
        
        function setBounds() {
            // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
            // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다
            map.setBounds(bounds);
        }
        setBounds();
      }
      userHandler();
      
    });
  }, []);

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
