StandaloneDashboard(function(db){
  var kpi = new KPITableComponent ();
  kpi.setDimensions (4, 6);
  kpi.setCaption('Food Units Available');

  kpi.addKPI('grains_cereals', {
    caption: 'Grains/Cereals',
    value: 308,
    numberSuffix: ' units'
  });

  kpi.addKPI('meat_poultry', {
    caption: 'Meat/Poultry',
    value: 165,
    numberSuffix: ' units'
  });

  kpi.addKPI('produce', {
    caption: 'Produce',
    value: 100,
    numberSuffix: ' units'
  });

  kpi.addKPI('seafood', {
    caption: 'Sea Food',
    value: 701,
    numberSuffix: ' units'
  });
  db.addComponent (kpi);
});;