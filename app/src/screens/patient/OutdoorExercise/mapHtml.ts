export const mapHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
        <title>카카오 맵 운동 게임</title>
        <style>
            body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; }
            #map { width: 100%; height: 100%; }
            .loading { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; z-index: 1000; }
            .checkpoint-notification {
                position: absolute; bottom: 20px; left: 20px; right: 20px;
                background: linear-gradient(135deg, #4CAF50, #45a049);
                color: white; border-radius: 16px; padding: 20px; text-align: center;
                font-weight: bold; font-size: 18px; display: none; z-index: 1000;
                box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            }
        </style>
    </head>
    <body>
        <div id="loading" class="loading">
            <div>🗺️</div>
            <div>지도를 불러오는 중...</div>
        </div>
        
        <div id="checkpoint-notification" class="checkpoint-notification">
            <div style="font-size: 24px; margin-bottom: 8px;">🎉 체크포인트 달성!</div>
            <div id="checkpoint-message">새로운 도전이 기다립니다!</div>
        </div>
        
        <div id="map"></div>

        <script>
            let map, userMarker = null, currentCheckpoint = null, checkpointMarker = null;
            let checkpointCircle = null, userPath = [], pathPolyline = null;
            
            let gameState = {
                userPosition: null, currentDistance: 0, totalDistance: 0,
                checkpointCount: 0, checkpointRadius: 50, maxDistance: 3500, isTracking: false
            };
            
            function showLoading() { document.getElementById('loading').style.display = 'block'; }
            function hideLoading() { document.getElementById('loading').style.display = 'none'; }
            
            function loadKakaoMapAPI() {
                return new Promise((resolve, reject) => {
                    if (window.kakao && window.kakao.maps) { resolve(); return; }
                    
                    const script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=4130719bf72a312a77503c40294d252d&libraries=services&autoload=false';
                    
                    script.onload = () => {
                        kakao.maps.load(() => resolve());
                    };
                    script.onerror = reject;
                    document.head.appendChild(script);
                });
            }
            
            async function initializeMap(lat, lng) {
                showLoading();
                try {
                    await loadKakaoMapAPI();
                    
                    const mapContainer = document.getElementById('map');
                    const mapOption = {
                        center: new kakao.maps.LatLng(lat, lng),
                        level: 4,
                        mapTypeId: kakao.maps.MapTypeId.ROADMAP
                    };
                    
                    map = new kakao.maps.Map(mapContainer, mapOption);
                    
                    gameState.userPosition = { lat, lng };
                    createUserMarker(lat, lng);
                    createRandomCheckpoint();
                    
                    hideLoading();
                    sendMessageToApp({ type: 'map_initialized', success: true });
                } catch (error) {
                    hideLoading();
                    sendMessageToApp({ type: 'error', message: '지도를 불러올 수 없습니다: ' + error.message });
                }
            }
            
            function updateUserPositionFromNative(newLat, newLng) {
                const previousPosition = gameState.userPosition;
                
                if (previousPosition) {
                    const distance = calculateDistance(
                        previousPosition.lat, previousPosition.lng, newLat, newLng
                    );
                    
                    if (distance >= 1) {
                        gameState.currentDistance += distance;
                        gameState.totalDistance += distance;
                        userPath.push(new kakao.maps.LatLng(newLat, newLng));
                        updateUserPath();
                    }
                }
                
                gameState.userPosition = { lat: newLat, lng: newLng };
                
                if (userMarker) userMarker.setPosition(new kakao.maps.LatLng(newLat, newLng));
                if (map) map.panTo(new kakao.maps.LatLng(newLat, newLng));
                
                checkCheckpointReached();
                sendLocationUpdate();
            }
            
            function createUserMarker(lat, lng) {
                userMarker = new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(lat, lng),
                    map: map
                });
                map.setCenter(new kakao.maps.LatLng(lat, lng));
            }
            
            function createRandomCheckpoint() {
                if (!gameState.userPosition || !map) return;
                
                if (checkpointMarker) checkpointMarker.setMap(null);
                if (checkpointCircle) checkpointCircle.setMap(null);
                
                const angle = Math.random() * 2 * Math.PI;
                const distance = gameState.checkpointRadius;
                
                const deltaLat = (distance * Math.cos(angle)) / 111000;
                const deltaLng = (distance * Math.sin(angle)) / (111000 * Math.cos(gameState.userPosition.lat * Math.PI / 180));
                
                const checkpointLat = gameState.userPosition.lat + deltaLat;
                const checkpointLng = gameState.userPosition.lng + deltaLng;
                
                currentCheckpoint = { lat: checkpointLat, lng: checkpointLng, radius: 25 };
                
                checkpointMarker = new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(checkpointLat, checkpointLng),
                    map: map
                });
                
                checkpointCircle = new kakao.maps.Circle({
                    center: new kakao.maps.LatLng(checkpointLat, checkpointLng),
                    radius: currentCheckpoint.radius,
                    strokeWeight: 3, strokeColor: '#FFD700', strokeOpacity: 0.8,
                    fillColor: '#FFD700', fillOpacity: 0.15
                });
                
                checkpointCircle.setMap(map);
            }
            
            function updateUserPath() {
                if (pathPolyline) pathPolyline.setMap(null);
                
                if (userPath.length > 1) {
                    pathPolyline = new kakao.maps.Polyline({
                        path: userPath, strokeWeight: 4, strokeColor: '#2196F3',
                        strokeOpacity: 0.8, strokeStyle: 'solid'
                    });
                    pathPolyline.setMap(map);
                }
            }
            
            function checkCheckpointReached() {
                if (!currentCheckpoint || !gameState.userPosition) return;
                
                const distance = calculateDistance(
                    gameState.userPosition.lat, gameState.userPosition.lng,
                    currentCheckpoint.lat, currentCheckpoint.lng
                );
                
                if (distance <= currentCheckpoint.radius) {
                    onCheckpointReached();
                }
            }
            
            function onCheckpointReached() {
                gameState.checkpointCount++;
                gameState.checkpointRadius += 30;
                
                showCheckpointNotification();
                
                setTimeout(() => {
                    createRandomCheckpoint();
                }, 2000);
                
                sendMessageToApp({
                    type: 'checkpoint_reached',
                    checkpointCount: gameState.checkpointCount,
                    newRadius: gameState.checkpointRadius,
                    totalDistance: Math.round(gameState.totalDistance)
                });
            }
            
            function showCheckpointNotification() {
                const notification = document.getElementById('checkpoint-notification');
                const message = document.getElementById('checkpoint-message');
                
                const messages = [
                    '훌륭합니다! 계속 도전하세요!',
                    '잘하고 있어요! 다음 목표로!',
                    '대단해요! 더 멀리 가봐요!'
                ];
                
                message.textContent = messages[Math.floor(Math.random() * messages.length)];
                notification.style.display = 'block';
                
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 3000);
            }
            
            function calculateDistance(lat1, lng1, lat2, lng2) {
                const R = 6371e3;
                const φ1 = lat1 * Math.PI / 180;
                const φ2 = lat2 * Math.PI / 180;
                const Δφ = (lat2 - lat1) * Math.PI / 180;
                const Δλ = (lng2 - lng1) * Math.PI / 180;

                const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                        Math.cos(φ1) * Math.cos(φ2) *
                        Math.sin(Δλ/2) * Math.sin(Δλ/2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

                return R * c;
            }
            
            function sendLocationUpdate() {
                const progress = Math.min(100, (gameState.totalDistance / gameState.maxDistance) * 100);
                
                sendMessageToApp({
                    type: 'location_update',
                    distance: Math.round(gameState.totalDistance),
                    currentDistance: Math.round(gameState.currentDistance),
                    progress: progress,
                    checkpoints: gameState.checkpointCount,
                    position: gameState.userPosition
                });
            }
            
            function sendMessageToApp(data) {
                if (window.ReactNativeWebView) {
                    window.ReactNativeWebView.postMessage(JSON.stringify(data));
                }
            }
            
            function resetGameState() {
                gameState = {
                    userPosition: null, currentDistance: 0, totalDistance: 0,
                    checkpointCount: 0, checkpointRadius: 50, maxDistance: 3500, isTracking: false
                };
                
                userPath = [];
                if (pathPolyline) { pathPolyline.setMap(null); pathPolyline = null; }
                if (checkpointMarker) { checkpointMarker.setMap(null); checkpointMarker = null; }
                if (checkpointCircle) { checkpointCircle.setMap(null); checkpointCircle = null; }
            }
            
            window.addEventListener('message', function(event) {
                try {
                    const data = JSON.parse(event.data);
                    
                    switch(data.type) {
                        case 'init_map':
                            initializeMap(data.lat, data.lng);
                            break;
                        case 'update_location':
                            updateUserPositionFromNative(data.lat, data.lng);
                            break;
                        case 'set_max_distance':
                            gameState.maxDistance = data.maxDistance;
                            break;
                        case 'reset_game':
                            resetGameState();
                            break;
                    }
                } catch (error) {
                    console.error('React Native 메시지 파싱 오류:', error);
                }
            });
            
            window.addEventListener('load', function() {
                sendMessageToApp({ type: 'map_ready' });
            });
        </script>
    </body>
    </html>`;
