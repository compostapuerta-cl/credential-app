import React from 'react';
import ReactPDF, {
  Page,
  Text,
  Image,
  View,
  Document,
  StyleSheet,
} from '../../dist/react-pdf.es.js';
const faker = require('faker');

const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

const times = function(n, iterator) {
  const accum = Array(Math.max(0, n));
  for (let i = 0; i < n; i++) accum[i] = iterator(i);
  return accum;
};

const relations = ['plenary', 'speaker', 'assistant', 'panel'];

const assistants = times(20, n => ({
  id: n,
  name: faker.name.findName(),
  organization: faker.company.companyName(),
  relation: faker.random.arrayElement(relations),
}));

const small = { fontSize: 12 };
const row = { display: 'flex', flexDirection: 'row' };

const styles = StyleSheet.create({
  credential: {
    width: '49%',
    height: '25%',
    marginHorizontal: 1,
  },
  container: {
    padding: 14,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%',
  },
  content: {},
  logo: {
    display: 'flex',
    flexDirection: 'row',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    display: 'flex',
    alignContent: 'center',
  },
  eventName: {
    fontSize: 8,
    padding: 4,
    color: 'white',
    textAlign: 'right',
  },
});

const image = { width: 100, marginTop: -8, marginLeft: 10 };

const Output = () => (
  <Document
    author="SOPIOS"
    keywords="credentials"
    subject="CLAIO 2018 credentials"
    title="CLAIO 2018 credentials"
  >
    <Page size="A4" style={{ ...row, flexWrap: 'wrap' }} wrap>
      {assistants.map(Assistant)}
    </Page>
  </Document>
);

const getColor = relation =>
  [
    { relation: 'plenary', value: '#800000' },
    { relation: 'speaker', value: '#4183C4' },
    { relation: 'assistant', value: 'gray' },
    { relation: 'panel', value: 'blue' },
  ].find(x => x.relation === relation).value;

const Assistant = ({ id, name, relation, organization }) => {
  const color = getColor(relation);
  return (
    <View key={id} style={styles.credential}>
      <View style={styles.container}>
        <View style={{ ...row }}>
          <Text style={{ fontSize: 6 }}>Organized by:</Text>
          <Image
            src="http://res.cloudinary.com/sopios/image/upload/v1536815807/claio_top_vsfax6.png"
            style={image}
          />
        </View>
        <View style={styles.content}>
          <Text style={{ fontSize: 27 }}>{name}</Text>
          <Text style={small}>
            {capitalizeFirstLetter(relation)}, {organization}
          </Text>
        </View>
        <View style={styles.logo}>
          <Image
            src="http://res.cloudinary.com/sopios/image/upload/v1535473671/claio-2018-logo_wbn5af.png"
            style={{ width: 65, height: 42 }}
          />
          <View
            style={{
              width: 200,
              display: 'flex',
              justifyContent: 'flex-end',
              flexWrap: 'wrap',
              flexDirection: 'row',
            }}
          >
            <Text style={{ fontSize: 8, paddingBottom: 2 }}>
              September 24-27, 2018 | Lima, Perú
            </Text>
            <Text style={{ fontSize: 36 }}>
              CLAIO <Text style={{ color }}>2018</Text>
            </Text>
          </View>
        </View>
      </View>
      <View style={{ ...styles.footer, backgroundColor: color }}>
        <Text style={styles.eventName}>
          XIX Latin-Iberoamerican Conference on Operations Research
        </Text>
      </View>
    </View>
  );
};

ReactPDF.render(<Output />, `${__dirname}/output.pdf`);
