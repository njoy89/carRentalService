import { Car, CarStatus } from '../types';

const loadCars = () => Promise.resolve<Car[]>(
    // TODO
    [
        {'id':'1306bf66-ad11-4348-b1ae-7d3d1dd6b0f4','model':'Mercedes-Benz','carBodyType':'Hatchback','releaseYear':2018,'carStatus':CarStatus.AVAILABLE,'amount':25.0,'url':'https://c4d709dd302a2586107d-f8305d22c3db1fdd6f8607b49e47a10c.ssl.cf1.rackcdn.com/thumbnails/stock-images/ce6a700ba071f03056a4a02fe09e6f96.png'},
        {'id':'80c80bb9-6aaf-46bf-8580-e40b070c5e91','model':'Land Rover','carBodyType':'Crossover','releaseYear':2017,'carStatus':CarStatus.RENTED,'amount':24.0,'url':'https://st.motortrend.ca/uploads/sites/10/2017/11/2017-land-rover-discovery-sport-hse-lux-suv-angular-front.png'},
        {'id':'d8bfe268-60e9-463a-bd62-b617617148db','model':'Suzuki Kizashi','carBodyType':'Sedan','releaseYear':2019,'carStatus':CarStatus.AVAILABLE,'amount':50.0,'url':'https://www.cstatic-images.com/car-pictures/xl/usc30szc101c021001.png'},
        {'id':'6c86fe65-c634-4ff0-9b2c-498f583fd82f','model':'Audi Q5','carBodyType':'Crossover','releaseYear':2016,'carStatus':CarStatus.AVAILABLE,'amount':32.0,'url':'https://c4d709dd302a2586107d-f8305d22c3db1fdd6f8607b49e47a10c.ssl.cf1.rackcdn.com/thumbnails/stock-images/febe338086b4304a06da5dbbe85d93e9.png'},
        {'id':'348815c8-6269-4f06-9730-2afabe8b147c','model':'Mitsubishi Lancer','carBodyType':'Sedan','releaseYear':2018,'carStatus':CarStatus.AVAILABLE,'amount':32.0,'url':'https://st.motortrend.com/uploads/sites/10/2015/11/2012-mitsubishi-lancer-evolution-mr-sedan-angular-front.png'},
        {'id':'f641f89f-ca2a-472f-8ac8-779bac3f06ad','model':'Toyota Corolla','carBodyType':'Sedan','releaseYear':2018,'carStatus':CarStatus.AVAILABLE,'amount':32.0,'url':'https://www.cstatic-images.com/car-pictures/xl/usc70toc041g021001.png'},
        {'id':'d2791dc7-163f-41d0-976f-6174bdd739ab','model':'Mazda Miata','carBodyType':'Convertible','releaseYear':2011,'carStatus':CarStatus.AVAILABLE,'amount':32.0,'url':'https://st.motortrend.com/uploads/sites/10/2015/11/2011-mazda-mx5-miata-gt-hard-top-convertible-angular-front.png'},
        {'id':'cc7f9c06-57e0-4c64-bbac-95b9630156cf','model':'Honda Accord','carBodyType':'Sedan','releaseYear':2019,'carStatus':CarStatus.AVAILABLE,'amount':32.0,'url':'https://images.honda.ca/models/H/Models/2019/accord_sedan/lx_10560_crystal_black_pearl_front.png?width=1000'},
        {'id':'076c7b9a-5f97-4cfc-9db2-6ad7accc492b','model':'Nissan Juke','carBodyType':'Crossover','releaseYear':2017,'carStatus':CarStatus.UNAVAILABLE,'amount':32.0,'url':'https://st.motortrend.com/uploads/sites/10/2015/11/2014-nissan-juke-sv-fwd-cvt-suv-angular-front.png'},
        {'id':'a56f24cb-009c-4a1d-83b7-dc2e3ca0b4f6','model':'Volvo S60','carBodyType':'Sedan','releaseYear':2019,'carStatus':CarStatus.AVAILABLE,'amount':20.0,'url':'https://postmediadriving.files.wordpress.com/2018/05/chrome-image-394131.png?w=800&h=520&crop=1'}
    ]
);

export default {
    loadCars
}
