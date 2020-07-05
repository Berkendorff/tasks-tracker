--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3 (Ubuntu 12.3-1.pgdg18.04+1)
-- Dumped by pg_dump version 12.3 (Ubuntu 12.3-1.pgdg18.04+1)

-- Started on 2020-07-05 16:15:57 EEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 203 (class 1259 OID 17289)
-- Name: task; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.task (
    id integer NOT NULL,
    title character varying NOT NULL,
    description character varying NOT NULL,
    status character varying NOT NULL,
    "userId" integer
);


ALTER TABLE public.task OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 17287)
-- Name: task_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.task_id_seq OWNER TO postgres;

--
-- TOC entry 2955 (class 0 OID 0)
-- Dependencies: 202
-- Name: task_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.task_id_seq OWNED BY public.task.id;


--
-- TOC entry 205 (class 1259 OID 17324)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    first_name character varying,
    second_name character varying,
    email character varying NOT NULL,
    date_creation timestamp without time zone,
    password character varying NOT NULL,
    salt character varying NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 17322)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- TOC entry 2956 (class 0 OID 0)
-- Dependencies: 204
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- TOC entry 2811 (class 2604 OID 17292)
-- Name: task id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task ALTER COLUMN id SET DEFAULT nextval('public.task_id_seq'::regclass);


--
-- TOC entry 2812 (class 2604 OID 17327)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 2947 (class 0 OID 17289)
-- Dependencies: 203
-- Data for Name: task; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.task (id, title, description, status, "userId") FROM stdin;
1	title	desc	VIEW	1
3	title	desc	VIEW	1
2	title	desc	VIEW	2
4	title aaa	desc	VIEW	4
5	title aaa	desc	VIEW	4
6	title aaa	desc	VIEW	4
7	title aaaaa	desc	VIEW	2
8	title aaaaa	desc	VIEW	2
9	title aaaaa	desc	VIEW	2
10	title a	desc	VIEW	5
11	title a	desc	VIEW	5
12	title a	desc	VIEW	5
13	title aaa	desc	VIEW	7
14	title aaa	desc	VIEW	7
15	title aaa	desc	VIEW	7
\.


--
-- TOC entry 2949 (class 0 OID 17324)
-- Dependencies: 205
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, first_name, second_name, email, date_creation, password, salt) FROM stdin;
1	\N	\N	aaaa@aaaa.com	2020-07-04 23:30:37.515	$2b$10$ABUq/9MUHgCkH.cAXd.OtupLNBM.ZmF7NzVGsz9ZthmHnOeJvedbC	$2b$10$ABUq/9MUHgCkH.cAXd.Otu
2	\N	\N	aaaaa@aaaa.com	2020-07-05 00:02:56.728	$2b$10$juTgSv7NL6x8F9MdA1g0Y.Zjfx9WZgipGLf/p.i8XYkWklaE3aRn.	$2b$10$juTgSv7NL6x8F9MdA1g0Y.
4	\N	\N	aaa@aaaa.com	2020-07-05 16:04:15.361	$2b$10$N7.0.NWmA.5AwOdV0YRnrOPUNPVh881/kFn2BZ/s0lCnmu1m9coYK	$2b$10$N7.0.NWmA.5AwOdV0YRnrO
5	\N	\N	a@a.com	2020-07-05 16:04:21.243	$2b$10$753YL2WFBb/Vt58J7KVBee6J44ebEEXgL30BBdxXYS1MTPBi7Yvie	$2b$10$753YL2WFBb/Vt58J7KVBee
6	\N	\N	aa@aa.com	2020-07-05 16:04:25.446	$2b$10$YQk9P1qZqfl/QTyTvTbcEuzh7rnKICnGC1uAVKiNYvojMP.1VN2iq	$2b$10$YQk9P1qZqfl/QTyTvTbcEu
7	\N	\N	aaa@aaa.com	2020-07-05 16:04:28.67	$2b$10$obMAAsy/uQHWzREA4E1e3OOPAAkxSq/mFM7wflWVD7dxWM4Du72Hy	$2b$10$obMAAsy/uQHWzREA4E1e3O
\.


--
-- TOC entry 2957 (class 0 OID 0)
-- Dependencies: 202
-- Name: task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.task_id_seq', 15, true);


--
-- TOC entry 2958 (class 0 OID 0)
-- Dependencies: 204
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 7, true);


--
-- TOC entry 2816 (class 2606 OID 17332)
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- TOC entry 2814 (class 2606 OID 17297)
-- Name: task PK_fb213f79ee45060ba925ecd576e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY (id);


--
-- TOC entry 2818 (class 2606 OID 17334)
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- TOC entry 2819 (class 2606 OID 17335)
-- Name: task FK_f316d3fe53497d4d8a2957db8b9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


-- Completed on 2020-07-05 16:15:57 EEST

--
-- PostgreSQL database dump complete
--

