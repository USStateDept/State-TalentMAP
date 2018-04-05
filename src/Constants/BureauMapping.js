export const BUREAU_MAPPING = [
  /* {
    id: 1,
    description: 'Regional Bureaus',
    codeGroup: ['110000', '120000', '130000', '140000', '146000', '150000', '160000'],
    isRegional: true,
  }, */
  {
    id: '2',
    description: 'Arms Control and International Security',
    codeGroup: ['014540', '010164', '014000'],
  },
  {
    id: '3',
    description: 'Civilian Security, Democracy, and Human Rights',
    codeGroup: ['013000', '033510', '018000', '031000', '010113', '011810'],
  },
  {
    id: '4',
    description: 'Democratic Republic of Congo',
    codeGroup: ['010108', '010183', '010106', '010145'],
  },
  {
    id: '5',
    description: 'Economic Growth, Energy, and the Environment',
    codeGroup: ['040700', '041600', '011701', '021250'],
  },
  {
    id: '6',
    description: 'Management',
    codeGroup: ['201000', '041900', '170100', '010623', '016000', '241000', '012900', '012200'],
  },
  {
    id: '7',
    description: 'Public Diplomacy and Public Affairs',
    codeGroup: ['100100'],
  },
  {
    id: '8',
    description: 'Special Representatives, Envoys, Advisors & Coordinators',
    codeGroup: ['011210', '011702', '010173', '010114', '010135', '010170', '010163', '010140', '010182', '010179', '010160', '010181'],
  },
];

export const getBureauCodeGroup = () => {
  let codeGroup = [];
  BUREAU_MAPPING.forEach((group) => {
    codeGroup = codeGroup.concat(group.codeGroup);
  });
  return codeGroup.toString();
};
