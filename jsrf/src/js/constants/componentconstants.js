define([], function () {

  var spinner = {
    options: {
      lines: 12,
      length: 6,
      width: 4,
      radius: 12,
      corners: 1,
      rotate: 0,
      direction: 1,
      color: '#000',
      speed: 1,
      trail: 60,
      shadow: false,
      hwaccel: false,
      className: 'spinner',
      zIndex: 2e9,
      top: 'auto',
      left: 'auto'
    }
  };

  var dashboard_constants = {
    resizeDelay: 150,
    dimension: {
      w: 4,
      h: 4
    }
  };

  var component = {
    xPadding: 20,
    yPadding: 20
  };

  var chart_profiles = {
    'chart': {
      drawAxesFlag: true,
      paddingLeft: 10,
      paddingTop: 15,
      paddingBottom: 25,
      paddingRight: 10,
      xAxisItemPadding: 0.2,
      seriesInterColumnPadding: 0.15,
      prettifyDomain: true,
      stickLineChartToSides: false,
      drawYAxisNameFlag: true,
      yAxisNameWidth: 20,
      showGridLineFlag: true,
      wrapLabelsFlag: true,
      circleRadius: 4,
      dualStageAnimate: false,
      yAxisLabelSize: 16,
      yAxisLabelHeight: 10
    },
    'spark': {
      drawAxesFlag: false,
      paddingLeft: 20,
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 20,
      xAxisItemPadding: 0,
      seriesInterColumnPadding: 0.1,
      prettifyDomain: true,
      stickLineChartToSides: true,
      drawYAxisNameFlag: false,
      yAxisNameWidth: 0,
      showGridLineFlag: true,
      wrapLabelsFlag: false,
      circleRadius: 3,
      dualStageAnimate: true
    }
  };

  var chart = {
    animationDuration: 1000
  };

  var gauge = {
    startAngle: -1.7 * Math.PI / 2,
    endAngle: 1.7 * Math.PI / 2,
    fontSize: 40,
    arcWidth: 0.1,
    xPadding: 0.1,
    animationDuration: 1000
  };

  var pieChart = {
    innerRadiusDistance: 50,
    profile: {
      labelHeight: 18
    },
    animationDuration : 1000,
    padding: 20
  };

  var tooltip_profile = {
    opacity: 0.9,
    tooltipOffsetX: 40,
    tooltipOffsetY: 40,
    tooltipHeight: 20,
    tooltipBackground: '#fff',
    tooltipPaddingX: 20
  };

  var wrapGenius = {
    LINE_HEIGHT: 14,
    FONT_SIZE: 12,
    THETA: 45,
    MAX_HEIGHT_PERCENT: 0.25,
    PADDING: 5
  };

  return {
    'spinner': spinner,
    'component': component,
    'dashboard': dashboard_constants,
    'chart_profiles': chart_profiles,
    'chart': chart,
    'pieChart': pieChart,
    'gauge': gauge,
    'tooltip': tooltip_profile,
    'wrapGenius': wrapGenius
  };

});
