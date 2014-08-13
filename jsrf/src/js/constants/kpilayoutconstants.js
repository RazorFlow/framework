define([], function () {
  var basicKPI = {
    'portrait': [
      {
        x: 1,
        y: 2,
        w: 10,
        h: 3,
        lines: 2,
        fontScale: 0.7,
        className: 'rfKPICaption',
        aspectAdjust: true
      },
      {
        x: 0,
        y: 5,
        w: 12,
        h: 5,
        fontScale: 0.5,
        className: 'rfKPIValue',
        aspectAdjust: true,
        verticalAlign: 'center'
      }
    ],
    'landscape': [
      {
        x: 1,
        y: 2,
        w: 10,
        h: 3,
        lines: 2,
        fontScale: 1,
        className: 'rfKPICaption',
        aspectAdjust: true
      },
      {
        x: 1,
        y: 5,
        w: 10,
        h: 5,
        fontScale: 0.5,
        className: 'rfKPIValue',
        aspectAdjust: true,
        verticalAlign: 'center'
      }
    ],
    'mobile': [
      {
        x: 4.5,
        y: 4.7,
        w: 7.5,
        h: 6,
        lines: 2,
        className: 'rfKPICaption'
      },
      {
        x: 0.5,
        y: 3.5,
        w: 4,
        h: 6,
        fontScale: 0.64,
        className: 'rfKPIValue'
      }
    ]
  };

  var basicGauge = {
    'portrait': [
      {
        x: 1,
        y: 1,
        w: 10,
        h: 3,
        lines: 2,
        fontScale: 1,
        className: 'rfKPICaption'
      },
      {
        x: 2,
        y: 4,
        w: 8,
        h: 8,
        className: 'rfKPIGauge'
      }
    ],
    'landscape': [
      {
        x: 2,
        y: 1,
        w: 8,
        h: 3,
        lines: 2,
        fontScale: 1,
        className: 'rfKPICaption'
      },
      {
        x: 2,
        y: 4,
        w: 8,
        h: 8,
        className: 'rfKPIGauge'
      }
    ],
    'mobile': [
      {
        x: 0.5,
        y: 1,
        w: 4,
        h: 10,
        className: 'rfKPIGauge'
      },
      {
        x: 5,
        y: 4,
        w: 6.5,
        h: 7,
        lines: 2,
        className: 'rfKPICaption'
      }

      // {
      //   x: 5,
      //   y: 6,
      //   w: 6.5,
      //   h: 6,
      //   className: 'rfKPIValue'
      // }
    ]
  };

  var kpiWithSpark = {
    'portrait': [
      {
        x: 1,
        y: 1,
        w: 10,
        h: 3,
        lines: 2,
        fontScale: 1,
        className: 'rfKPICaption'
      },
      {
        x: 2,
        y: 4,
        w: 8,
        h: 4,
        fontScale: 0.7,
        verticalAlign: 'center',
        aspectAdjust: true,
        className: 'rfKPIValue'
      },
      {
        x: 0,
        y: 8.5,
        w: 12,
        h: 3.5,
        className: 'rfKPISpark'
      }

    ],
    'landscape': [
      {
        x: 1,
        y: 1,
        w: 10,
        h: 3,
        lines: 2,
        fontScale: 1,
        className: 'rfKPICaption'
      },
      {
        x: 2,
        y: 4,
        w: 8,
        h: 5,
        className: 'rfKPIValue'
      },
      {
        x: 0,
        y: 9,
        w: 12,
        h: 3,
        className: 'rfKPISpark'
      }
    ],
    'mobile': [
      {
        x: 6.5,
        y: 2,
        w: 5,
        h: 4,
        lines: 2,
        className: 'rfKPICaption'
      },

      {
        x: 0.5,
        y: 3.5,
        w: 4,
        h: 6,
        className: 'rfKPIValue'
      },
      {
        x: 6.5,
        y: 6,
        w: 5,
        h: 6,
        className: 'rfKPISpark'
      }
    ]
  };


  return {
    'basicKPI': basicKPI,
    'basicGauge': basicGauge,
    'kpiWithSpark': kpiWithSpark
  };
});