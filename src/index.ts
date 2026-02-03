export const spinWheelHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <title>Daily Spin</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body {
            width: 100%;
            height: 100%;
            overflow: hidden;
            background: linear-gradient(180deg, #0a0a1a 0%, #1a1a3a 50%, #0a0a1a 100%);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            color: #fff;
            touch-action: none;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            user-select: none;
        }
        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 20px;
            padding-top: 80px;
        }
        #header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            padding: 16px;
            padding-top: 55px;
            background: rgba(0,0,0,0.6);
            z-index: 100;
            text-align: center;
        }
        .header-label {
            font-size: 11px;
            font-weight: 600;
            color: #FDC659;
            text-transform: uppercase;
            letter-spacing: 3px;
        }
        .header-title {
            font-size: 24px;
            font-weight: 900;
            color: white;
            margin-top: 4px;
        }
        .wheel-container {
            position: relative;
            margin: 30px 0;
        }
        .wheel-glow {
            position: absolute;
            top: -20px;
            left: -20px;
            right: -20px;
            bottom: -20px;
            border-radius: 50%;
            border: 2px solid rgba(253, 198, 89, 0.2);
            pointer-events: none;
        }
        .wheel-glow-outer {
            position: absolute;
            top: -35px;
            left: -35px;
            right: -35px;
            bottom: -35px;
            border-radius: 50%;
            border: 1px solid rgba(253, 198, 89, 0.1);
            pointer-events: none;
        }
        #wheel {
            transition: transform 8s cubic-bezier(0.17, 0.67, 0.12, 0.99);
        }
        .pointer {
            position: absolute;
            top: -15px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 18px solid transparent;
            border-right: 18px solid transparent;
            border-top: 35px solid #E53935;
            z-index: 5;
            filter: drop-shadow(0 4px 8px rgba(229, 57, 53, 0.5));
        }
        #spinBtn {
            background: linear-gradient(135deg, #FDC659, #EF7C0D);
            border: none;
            color: #1a1a1a;
            padding: 18px 60px;
            font-size: 20px;
            font-weight: 700;
            border-radius: 30px;
            cursor: pointer;
            box-shadow: 0 8px 24px rgba(253, 198, 89, 0.4);
            transition: transform 0.2s, opacity 0.2s;
            margin-top: 20px;
        }
        #spinBtn:active {
            transform: scale(0.95);
        }
        #spinBtn:disabled {
            background: #4a4a5a;
            color: #8a8a9a;
            cursor: not-allowed;
            box-shadow: none;
        }
        #result {
            display: none;
            text-align: center;
            margin-top: 30px;
            padding: 24px 40px;
            background: rgba(0,0,0,0.6);
            border-radius: 24px;
            border: 2px solid #FDC659;
            animation: popIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        @keyframes popIn {
            0% { transform: scale(0); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
        .result-label {
            font-size: 12px;
            color: rgba(255,255,255,0.7);
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .result-value {
            font-size: 56px;
            font-weight: 900;
            color: #FDC659;
            margin: 8px 0;
        }
        .result-unit {
            font-size: 18px;
            font-weight: 700;
            color: #FDC659;
            opacity: 0.8;
        }
        .result-tier {
            display: inline-block;
            padding: 6px 16px;
            background: rgba(253, 198, 89, 0.2);
            border-radius: 16px;
            font-size: 11px;
            font-weight: 800;
            color: #FDC659;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-top: 8px;
        }
        #comeBack {
            display: none;
            text-align: center;
            padding: 20px 32px;
            background: rgba(255,255,255,0.05);
            border-radius: 20px;
            border: 1px solid rgba(255,255,255,0.1);
            margin-top: 20px;
        }
        #resetBtn {
            background: transparent;
            border: 1px solid rgba(255,255,255,0.2);
            color: rgba(255,255,255,0.5);
            padding: 8px 16px;
            font-size: 12px;
            border-radius: 12px;
            cursor: pointer;
            margin-top: 12px;
        }
        #comeBack h3 {
            font-size: 18px;
            margin-bottom: 8px;
        }
        #comeBack p {
            font-size: 14px;
            color: rgba(255,255,255,0.6);
        }
        .today-reward {
            color: #FDC659 !important;
            font-weight: 700;
        }
        #history {
            margin-top: 40px;
            width: 100%;
            max-width: 320px;
        }
        .history-title {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 12px;
        }
        .history-line {
            flex: 1;
            height: 1px;
            background: rgba(255,255,255,0.1);
        }
        .history-label {
            font-size: 11px;
            font-weight: 600;
            color: rgba(255,255,255,0.4);
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .history-items {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            justify-content: center;
        }
        .history-item {
            padding: 8px 16px;
            background: rgba(255,255,255,0.05);
            border-radius: 12px;
            font-size: 15px;
            font-weight: 700;
            color: rgba(255,255,255,0.6);
        }
        .history-item.latest {
            background: rgba(253, 198, 89, 0.15);
            border: 1px solid rgba(253, 198, 89, 0.3);
            color: #FDC659;
        }
        .decorative-circle {
            position: fixed;
            border-radius: 50%;
            pointer-events: none;
        }
        .circle-1 {
            top: -100px;
            right: -100px;
            width: 300px;
            height: 300px;
            background: rgba(253, 198, 89, 0.05);
        }
        .circle-2 {
            bottom: -50px;
            left: -50px;
            width: 200px;
            height: 200px;
            background: rgba(239, 124, 13, 0.05);
        }
    </style>
</head>
<body>
    <div class="decorative-circle circle-1"></div>
    <div class="decorative-circle circle-2"></div>

    <div id="header">
        <div class="header-label">Daily Bonus</div>
        <div class="header-title">Spin & Win</div>
    </div>

    <div class="container">
        <div class="wheel-container">
            <div class="wheel-glow"></div>
            <div class="wheel-glow-outer"></div>
            <div class="pointer"></div>
            <svg id="wheel" width="280" height="280" viewBox="0 0 280 280"></svg>
        </div>

        <button id="spinBtn" onclick="spin()">SPIN!</button>

        <div id="result">
            <div class="result-label">You won</div>
            <div><span class="result-value" id="resultValue">0</span> <span class="result-unit">MP</span></div>
            <div class="result-tier" id="resultTier">COMMON</div>
        </div>

        <div id="comeBack">
            <h3>Come back tomorrow!</h3>
            <p>Today's reward: <span class="today-reward" id="todayReward">0 MP</span></p>
            <button id="resetBtn" onclick="resetWheel()">Reset (Testing)</button>
        </div>

        <div id="history">
            <div class="history-title">
                <div class="history-line"></div>
                <span class="history-label">Recent Spins</span>
                <div class="history-line"></div>
            </div>
            <div class="history-items" id="historyItems"></div>
        </div>
    </div>

    <script>
        // Wheel configuration
        var WHEEL_VALUES = [1, 4, 2, 7, 3, 10, 5, 8, 2, 20, 6, 3, 9, 50, 1, 4, 7, 2, 10, 5, 8, 100, 3, 6, 500, 9, 4, 1000, 2, 5];
        var SEGMENT_COUNT = WHEEL_VALUES.length;
        var SEGMENT_ANGLE = 360 / SEGMENT_COUNT;

        var WEIGHTED_VALUES = [
            { value: 1, weight: 14 },
            { value: 2, weight: 14 },
            { value: 3, weight: 12 },
            { value: 4, weight: 10 },
            { value: 5, weight: 10 },
            { value: 6, weight: 8 },
            { value: 7, weight: 7 },
            { value: 8, weight: 6 },
            { value: 9, weight: 5 },
            { value: 10, weight: 5 },
            { value: 20, weight: 4 },
            { value: 50, weight: 2 },
            { value: 100, weight: 1.5 },
            { value: 500, weight: 1 },
            { value: 1000, weight: 0.5 }
        ];

        var COLORS = {
            gold: '#FDC659',
            orange: '#EF7C0D',
            green: '#43A047',
            purple: '#9C27B0'
        };

        var TIER_CONFIG = {
            legendary: { color: '#9C27B0', label: 'LEGENDARY' },
            epic: { color: '#43A047', label: 'EPIC' },
            rare: { color: '#FDC659', label: 'RARE' },
            uncommon: { color: '#EF7C0D', label: 'UNCOMMON' },
            common: { color: '#8D6E63', label: 'COMMON' }
        };

        var isSpinning = false;
        var currentRotation = 0;
        var lastSpinDate = null;
        var spinHistory = [];

        // Load saved data
        try {
            lastSpinDate = localStorage.getItem('spinWheelLastSpin');
            spinHistory = JSON.parse(localStorage.getItem('spinWheelHistory') || '[]');
        } catch(e) {}

        function getSegmentColor(value, index) {
            if (value >= 1000) return COLORS.purple;
            if (value >= 500) return COLORS.green;
            if (value >= 100) return COLORS.green;
            if (value >= 50) return COLORS.gold;
            return index % 2 === 0 ? COLORS.gold : COLORS.orange;
        }

        function getResultTier(value) {
            if (value >= 500) return 'legendary';
            if (value >= 100) return 'epic';
            if (value >= 50) return 'rare';
            if (value >= 20) return 'uncommon';
            return 'common';
        }

        function getWeightedRandomValue() {
            var totalWeight = WEIGHTED_VALUES.reduce(function(sum, item) { return sum + item.weight; }, 0);
            var random = Math.random() * totalWeight;
            for (var i = 0; i < WEIGHTED_VALUES.length; i++) {
                random -= WEIGHTED_VALUES[i].weight;
                if (random <= 0) return WEIGHTED_VALUES[i].value;
            }
            return WEIGHTED_VALUES[0].value;
        }

        function findSegmentWithValue(value) {
            for (var i = 0; i < WHEEL_VALUES.length; i++) {
                if (WHEEL_VALUES[i] === value) return i;
            }
            return 0;
        }

        function canSpinToday() {
            if (!lastSpinDate) return true;
            return new Date().toDateString() !== new Date(lastSpinDate).toDateString();
        }

        function drawWheel() {
            var svg = document.getElementById('wheel');
            var size = 280;
            var radius = size / 2;
            var center = radius;

            var html = '';

            for (var i = 0; i < SEGMENT_COUNT; i++) {
                var startAngle = i * SEGMENT_ANGLE - 90;
                var endAngle = (i + 1) * SEGMENT_ANGLE - 90;
                var startRad = startAngle * Math.PI / 180;
                var endRad = endAngle * Math.PI / 180;

                var x1 = center + radius * Math.cos(startRad);
                var y1 = center + radius * Math.sin(startRad);
                var x2 = center + radius * Math.cos(endRad);
                var y2 = center + radius * Math.sin(endRad);

                var path = 'M ' + center + ' ' + center + ' L ' + x1 + ' ' + y1 + ' A ' + radius + ' ' + radius + ' 0 0 1 ' + x2 + ' ' + y2 + ' Z';
                var color = getSegmentColor(WHEEL_VALUES[i], i);

                html += '<path d="' + path + '" fill="' + color + '" stroke="#FFFFFF" stroke-width="1"/>';

                // Text
                var textAngle = i * SEGMENT_ANGLE - 90 + SEGMENT_ANGLE / 2;
                var textRad = textAngle * Math.PI / 180;
                var textRadius = radius * 0.75;
                var textX = center + textRadius * Math.cos(textRad);
                var textY = center + textRadius * Math.sin(textRad);
                var textRotation = textAngle + 90;
                var displayValue = WHEEL_VALUES[i] >= 1000 ? '1K' : WHEEL_VALUES[i];

                html += '<text x="' + textX + '" y="' + textY + '" fill="#FFFFFF" font-size="10" font-weight="bold" text-anchor="middle" dominant-baseline="middle" transform="rotate(' + textRotation + ' ' + textX + ' ' + textY + ')">' + displayValue + '</text>';
            }

            // Center circle
            html += '<circle cx="' + center + '" cy="' + center + '" r="15" fill="#1a1a1a" stroke="#FFFFFF" stroke-width="2"/>';

            svg.innerHTML = html;
        }

        function updateHistory() {
            var container = document.getElementById('historyItems');
            container.innerHTML = '';

            var recentHistory = spinHistory.slice(0, 5);
            for (var i = 0; i < recentHistory.length; i++) {
                var item = document.createElement('div');
                item.className = 'history-item' + (i === 0 ? ' latest' : '');
                item.textContent = '+' + recentHistory[i].value;
                container.appendChild(item);
            }
        }

        function getSegmentAtPointer(rotation) {
            // Normalize rotation to 0-360
            var normalizedRotation = ((rotation % 360) + 360) % 360;

            // The pointer is at the top (-90 degrees in SVG terms)
            // When the wheel rotates by X degrees, the segment originally at angle (-90 - X) is now at the pointer
            // Segment i covers angles from (i * SEGMENT_ANGLE - 90) to ((i+1) * SEGMENT_ANGLE - 90)
            // So we need to find which segment contains the angle (-90 - X) = (-90 - normalizedRotation)

            // Convert to segment space: what angle (relative to wheel) is at the pointer?
            // That angle is -normalizedRotation (or 360 - normalizedRotation)
            var angleAtPointer = (360 - normalizedRotation) % 360;

            // Each segment spans SEGMENT_ANGLE degrees, starting from segment 0 at 0 degrees
            // Segment i covers [i * SEGMENT_ANGLE, (i+1) * SEGMENT_ANGLE)
            var segmentIndex = Math.floor(angleAtPointer / SEGMENT_ANGLE);

            // Ensure we're in valid range
            segmentIndex = ((segmentIndex % SEGMENT_COUNT) + SEGMENT_COUNT) % SEGMENT_COUNT;

            return segmentIndex;
        }

        function spin() {
            if (isSpinning || !canSpinToday()) return;

            isSpinning = true;
            document.getElementById('spinBtn').disabled = true;
            document.getElementById('spinBtn').textContent = 'Spinning...';
            document.getElementById('result').style.display = 'none';

            // Use weighted random to bias towards certain segments
            var weightedValue = getWeightedRandomValue();
            var preferredSegment = findSegmentWithValue(weightedValue);

            // Calculate rotation to land on that segment
            // Add some randomness within the segment for variety
            var spins = 5 + Math.random() * 3;
            var segmentOffset = (Math.random() - 0.5) * SEGMENT_ANGLE * 0.6; // Random position within segment
            var targetAngle = preferredSegment * SEGMENT_ANGLE + SEGMENT_ANGLE / 2 + segmentOffset;
            var rotationToTarget = (360 - targetAngle + 360) % 360;

            var finalRotation = currentRotation + (spins * 360) + rotationToTarget;

            var wheel = document.getElementById('wheel');
            wheel.style.transform = 'rotate(' + finalRotation + 'deg)';
            currentRotation = finalRotation;

            setTimeout(function() {
                isSpinning = false;

                // IMPORTANT: Calculate the winning value from the ACTUAL final rotation
                // This ensures the displayed value always matches what the user sees
                var landedSegment = getSegmentAtPointer(currentRotation);
                var winningValue = WHEEL_VALUES[landedSegment];

                // Save result
                lastSpinDate = new Date().toISOString();
                spinHistory.unshift({ value: winningValue, timestamp: lastSpinDate });
                if (spinHistory.length > 10) spinHistory.pop();

                try {
                    localStorage.setItem('spinWheelLastSpin', lastSpinDate);
                    localStorage.setItem('spinWheelHistory', JSON.stringify(spinHistory));
                } catch(e) {}

                // Show result
                var tier = getResultTier(winningValue);
                var tierConfig = TIER_CONFIG[tier];

                document.getElementById('resultValue').textContent = winningValue;
                document.getElementById('resultTier').textContent = tierConfig.label + ' Reward';
                document.getElementById('resultTier').style.color = tierConfig.color;
                document.getElementById('resultTier').style.background = tierConfig.color + '30';
                document.getElementById('result').style.borderColor = tierConfig.color;
                document.getElementById('result').style.display = 'block';

                document.getElementById('spinBtn').style.display = 'none';
                document.getElementById('comeBack').style.display = 'block';
                document.getElementById('todayReward').textContent = winningValue + ' MP';

                updateHistory();
            }, 8000);
        }

        function resetWheel() {
            try {
                localStorage.removeItem('spinWheelLastSpin');
                localStorage.removeItem('spinWheelHistory');
            } catch(e) {}
            lastSpinDate = null;
            spinHistory = [];
            currentRotation = 0;
            document.getElementById('wheel').style.transition = 'none';
            document.getElementById('wheel').style.transform = 'rotate(0deg)';
            setTimeout(function() {
                document.getElementById('wheel').style.transition = 'transform 8s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
            }, 50);
            document.getElementById('spinBtn').style.display = 'block';
            document.getElementById('spinBtn').disabled = false;
            document.getElementById('spinBtn').textContent = 'SPIN!';
            document.getElementById('comeBack').style.display = 'none';
            document.getElementById('result').style.display = 'none';
            updateHistory();
        }

        function init() {
            drawWheel();
            updateHistory();

            if (!canSpinToday()) {
                document.getElementById('spinBtn').style.display = 'none';
                document.getElementById('comeBack').style.display = 'block';
                if (spinHistory.length > 0) {
                    document.getElementById('todayReward').textContent = spinHistory[0].value + ' MP';
                }
            }
        }

        init();
    </script>
</body>
</html>
`;
