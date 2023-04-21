import Head from 'next/head';
import { Fragment } from 'react'
import styles from "./Dashboard.module.css";
import Layout from '../Layout';
import Header from './Header';
import Form from './Form';
import Products from './Products';

const Dashboard = ({ Hydrated }) => {
    return (
        <Fragment>
            <Head>
                <title>Dashboard</title>
            </Head>

            <Layout Hydrated={Hydrated}>
                <section className={styles.Dashboard}>
                    <Form />

                    <Header />
                    <Products />
                </section>
            </Layout>
        </Fragment>
    );
};

export default Dashboard;