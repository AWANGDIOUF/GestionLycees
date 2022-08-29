package mefpai.gouv.sn.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import mefpai.gouv.sn.IntegrationTest;
import mefpai.gouv.sn.domain.LyceeTechnique;
import mefpai.gouv.sn.domain.enumeration.DAKAR;
import mefpai.gouv.sn.domain.enumeration.DIOURBEL;
import mefpai.gouv.sn.domain.enumeration.FATICK;
import mefpai.gouv.sn.domain.enumeration.KAFFRINE;
import mefpai.gouv.sn.domain.enumeration.KAOLACK;
import mefpai.gouv.sn.domain.enumeration.KEDOUGOU;
import mefpai.gouv.sn.domain.enumeration.KOLDA;
import mefpai.gouv.sn.domain.enumeration.LOUGA;
import mefpai.gouv.sn.domain.enumeration.MATAM;
import mefpai.gouv.sn.domain.enumeration.Region;
import mefpai.gouv.sn.domain.enumeration.SAINTLOUIS;
import mefpai.gouv.sn.domain.enumeration.SEDHIOU;
import mefpai.gouv.sn.domain.enumeration.TAMBACOUNDA;
import mefpai.gouv.sn.domain.enumeration.THIES;
import mefpai.gouv.sn.domain.enumeration.ZIGINCHOR;
import mefpai.gouv.sn.repository.LyceeTechniqueRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link LyceeTechniqueResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class LyceeTechniqueResourceIT {

    private static final String DEFAULT_PRENOM_NOM = "AAAAAAAAAA";
    private static final String UPDATED_PRENOM_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_ADRESSE = "AAAAAAAAAA";
    private static final String UPDATED_ADRESSE = "BBBBBBBBBB";

    private static final String DEFAULT_MAIL = "AAAAAAAAAA";
    private static final String UPDATED_MAIL = "BBBBBBBBBB";

    private static final String DEFAULT_TEL_1 = "AAAAAAAAAA";
    private static final String UPDATED_TEL_1 = "BBBBBBBBBB";

    private static final String DEFAULT_TEL_2 = "AAAAAAAAAA";
    private static final String UPDATED_TEL_2 = "BBBBBBBBBB";

    private static final String DEFAULT_BOITE_POSTAL = "AAAAAAAAAA";
    private static final String UPDATED_BOITE_POSTAL = "BBBBBBBBBB";

    private static final String DEFAULT_DECRET_CREATION = "AAAAAAAAAA";
    private static final String UPDATED_DECRET_CREATION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_CREATION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_CREATION = LocalDate.now(ZoneId.systemDefault());

    private static final Region DEFAULT_REGION = Region.DAKAR;
    private static final Region UPDATED_REGION = Region.DIOURBEL;

    private static final String DEFAULT_AUTRE_REGION = "AAAAAAAAAA";
    private static final String UPDATED_AUTRE_REGION = "BBBBBBBBBB";

    private static final DAKAR DEFAULT_DEPARTEMENT_DAKAR = DAKAR.DAKAR;
    private static final DAKAR UPDATED_DEPARTEMENT_DAKAR = DAKAR.GUEDIAWAYE;

    private static final DIOURBEL DEFAULT_DEPARTEMENT_DIOURBEL = DIOURBEL.BAMBAEY;
    private static final DIOURBEL UPDATED_DEPARTEMENT_DIOURBEL = DIOURBEL.DIOURBEL;

    private static final FATICK DEFAULT_DEPARTEMENT_FATICK = FATICK.FATICK;
    private static final FATICK UPDATED_DEPARTEMENT_FATICK = FATICK.FOUNDIOUGNE;

    private static final KAFFRINE DEFAULT_DEPARTEMENT_KAFFRINE = KAFFRINE.BIRKILANE;
    private static final KAFFRINE UPDATED_DEPARTEMENT_KAFFRINE = KAFFRINE.KAFFRINE;

    private static final KAOLACK DEFAULT_DEPARTEMENT_KAOLACK = KAOLACK.GUINGUINEO;
    private static final KAOLACK UPDATED_DEPARTEMENT_KAOLACK = KAOLACK.KAOLOACK;

    private static final KEDOUGOU DEFAULT_DEPARTEMENT_KEDOUGOU = KEDOUGOU.KEDOUGOU;
    private static final KEDOUGOU UPDATED_DEPARTEMENT_KEDOUGOU = KEDOUGOU.SALAMATA;

    private static final KOLDA DEFAULT_DEPARTEMENT_KOLDA = KOLDA.KOLDA;
    private static final KOLDA UPDATED_DEPARTEMENT_KOLDA = KOLDA.MEDINA_YORO_FOULAH;

    private static final LOUGA DEFAULT_DEPARTEMENT_LOUGA = LOUGA.KEBEMERE;
    private static final LOUGA UPDATED_DEPARTEMENT_LOUGA = LOUGA.LINGUERE;

    private static final MATAM DEFAULT_DEPARTEMENT_MATAM = MATAM.KANELKANEL;
    private static final MATAM UPDATED_DEPARTEMENT_MATAM = MATAM.MATAM;

    private static final SAINTLOUIS DEFAULT_DEPARTEMENT_SAINT = SAINTLOUIS.DAGANA;
    private static final SAINTLOUIS UPDATED_DEPARTEMENT_SAINT = SAINTLOUIS.PODOR;

    private static final SEDHIOU DEFAULT_DEPARTEMENT_SEDHIOU = SEDHIOU.BOUNKILING;
    private static final SEDHIOU UPDATED_DEPARTEMENT_SEDHIOU = SEDHIOU.GOUDOMP;

    private static final TAMBACOUNDA DEFAULT_DEPARTEMENT_TAMBACOUNDA = TAMBACOUNDA.BAKEL;
    private static final TAMBACOUNDA UPDATED_DEPARTEMENT_TAMBACOUNDA = TAMBACOUNDA.GOUDIRY;

    private static final THIES DEFAULT_DEPARTEMENT_THIS = THIES.MBOUR;
    private static final THIES UPDATED_DEPARTEMENT_THIS = THIES.THIES;

    private static final ZIGINCHOR DEFAULT_DEPARTEMENT_ZIGUINCHOR = ZIGINCHOR.BIGNONA;
    private static final ZIGINCHOR UPDATED_DEPARTEMENT_ZIGUINCHOR = ZIGINCHOR.OUSSOUYE;

    private static final String DEFAULT_AUTREDEPARTEMENT_DAKAR = "AAAAAAAAAA";
    private static final String UPDATED_AUTREDEPARTEMENT_DAKAR = "BBBBBBBBBB";

    private static final String DEFAULT_AUTREDEPARTEMENT_DIOURBEL = "AAAAAAAAAA";
    private static final String UPDATED_AUTREDEPARTEMENT_DIOURBEL = "BBBBBBBBBB";

    private static final String DEFAULT_AUTREDEPARTEMENT_FATICK = "AAAAAAAAAA";
    private static final String UPDATED_AUTREDEPARTEMENT_FATICK = "BBBBBBBBBB";

    private static final String DEFAULT_AUTREDEPARTEMENT_KAFFRINE = "AAAAAAAAAA";
    private static final String UPDATED_AUTREDEPARTEMENT_KAFFRINE = "BBBBBBBBBB";

    private static final String DEFAULT_AUTREDEPARTEMENT_KAOLACK = "AAAAAAAAAA";
    private static final String UPDATED_AUTREDEPARTEMENT_KAOLACK = "BBBBBBBBBB";

    private static final String DEFAULT_AUTREDEPARTEMENT_KEDOUGOU = "AAAAAAAAAA";
    private static final String UPDATED_AUTREDEPARTEMENT_KEDOUGOU = "BBBBBBBBBB";

    private static final String DEFAULT_AUTREDEPARTEMENT_KOLDA = "AAAAAAAAAA";
    private static final String UPDATED_AUTREDEPARTEMENT_KOLDA = "BBBBBBBBBB";

    private static final String DEFAULT_AUTREDEPARTEMENT_LOUGA = "AAAAAAAAAA";
    private static final String UPDATED_AUTREDEPARTEMENT_LOUGA = "BBBBBBBBBB";

    private static final String DEFAULT_AUTREDEPARTEMENT_MATAM = "AAAAAAAAAA";
    private static final String UPDATED_AUTREDEPARTEMENT_MATAM = "BBBBBBBBBB";

    private static final String DEFAULT_AUTREDEPARTEMENT_SAINT = "AAAAAAAAAA";
    private static final String UPDATED_AUTREDEPARTEMENT_SAINT = "BBBBBBBBBB";

    private static final String DEFAULT_AUTREDEPARTEMENT_SEDHIOU = "AAAAAAAAAA";
    private static final String UPDATED_AUTREDEPARTEMENT_SEDHIOU = "BBBBBBBBBB";

    private static final String DEFAULT_AUTREDEPARTEMENT_TAMBACOUNDA = "AAAAAAAAAA";
    private static final String UPDATED_AUTREDEPARTEMENT_TAMBACOUNDA = "BBBBBBBBBB";

    private static final String DEFAULT_AUTREDEPARTEMENT_THIS = "AAAAAAAAAA";
    private static final String UPDATED_AUTREDEPARTEMENT_THIS = "BBBBBBBBBB";

    private static final String DEFAULT_AUTREDEPARTEMENT_ZIGUINCHOR = "AAAAAAAAAA";
    private static final String UPDATED_AUTREDEPARTEMENT_ZIGUINCHOR = "BBBBBBBBBB";

    private static final String DEFAULT_COMMUNE = "AAAAAAAAAA";
    private static final String UPDATED_COMMUNE = "BBBBBBBBBB";

    private static final String DEFAULT_IA = "AAAAAAAAAA";
    private static final String UPDATED_IA = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/lycee-techniques";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private LyceeTechniqueRepository lyceeTechniqueRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLyceeTechniqueMockMvc;

    private LyceeTechnique lyceeTechnique;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LyceeTechnique createEntity(EntityManager em) {
        LyceeTechnique lyceeTechnique = new LyceeTechnique()
            .prenomNom(DEFAULT_PRENOM_NOM)
            .adresse(DEFAULT_ADRESSE)
            .mail(DEFAULT_MAIL)
            .tel1(DEFAULT_TEL_1)
            .tel2(DEFAULT_TEL_2)
            .boitePostal(DEFAULT_BOITE_POSTAL)
            .decretCreation(DEFAULT_DECRET_CREATION)
            .dateCreation(DEFAULT_DATE_CREATION)
            .region(DEFAULT_REGION)
            .autreRegion(DEFAULT_AUTRE_REGION)
            .departementDakar(DEFAULT_DEPARTEMENT_DAKAR)
            .departementDiourbel(DEFAULT_DEPARTEMENT_DIOURBEL)
            .departementFatick(DEFAULT_DEPARTEMENT_FATICK)
            .departementKaffrine(DEFAULT_DEPARTEMENT_KAFFRINE)
            .departementKaolack(DEFAULT_DEPARTEMENT_KAOLACK)
            .departementKedougou(DEFAULT_DEPARTEMENT_KEDOUGOU)
            .departementKolda(DEFAULT_DEPARTEMENT_KOLDA)
            .departementLouga(DEFAULT_DEPARTEMENT_LOUGA)
            .departementMatam(DEFAULT_DEPARTEMENT_MATAM)
            .departementSaint(DEFAULT_DEPARTEMENT_SAINT)
            .departementSedhiou(DEFAULT_DEPARTEMENT_SEDHIOU)
            .departementTambacounda(DEFAULT_DEPARTEMENT_TAMBACOUNDA)
            .departementThis(DEFAULT_DEPARTEMENT_THIS)
            .departementZiguinchor(DEFAULT_DEPARTEMENT_ZIGUINCHOR)
            .autredepartementDakar(DEFAULT_AUTREDEPARTEMENT_DAKAR)
            .autredepartementDiourbel(DEFAULT_AUTREDEPARTEMENT_DIOURBEL)
            .autredepartementFatick(DEFAULT_AUTREDEPARTEMENT_FATICK)
            .autredepartementKaffrine(DEFAULT_AUTREDEPARTEMENT_KAFFRINE)
            .autredepartementKaolack(DEFAULT_AUTREDEPARTEMENT_KAOLACK)
            .autredepartementKedougou(DEFAULT_AUTREDEPARTEMENT_KEDOUGOU)
            .autredepartementKolda(DEFAULT_AUTREDEPARTEMENT_KOLDA)
            .autredepartementLouga(DEFAULT_AUTREDEPARTEMENT_LOUGA)
            .autredepartementMatam(DEFAULT_AUTREDEPARTEMENT_MATAM)
            .autredepartementSaint(DEFAULT_AUTREDEPARTEMENT_SAINT)
            .autredepartementSedhiou(DEFAULT_AUTREDEPARTEMENT_SEDHIOU)
            .autredepartementTambacounda(DEFAULT_AUTREDEPARTEMENT_TAMBACOUNDA)
            .autredepartementThis(DEFAULT_AUTREDEPARTEMENT_THIS)
            .autredepartementZiguinchor(DEFAULT_AUTREDEPARTEMENT_ZIGUINCHOR)
            .commune(DEFAULT_COMMUNE)
            .ia(DEFAULT_IA);
        return lyceeTechnique;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LyceeTechnique createUpdatedEntity(EntityManager em) {
        LyceeTechnique lyceeTechnique = new LyceeTechnique()
            .prenomNom(UPDATED_PRENOM_NOM)
            .adresse(UPDATED_ADRESSE)
            .mail(UPDATED_MAIL)
            .tel1(UPDATED_TEL_1)
            .tel2(UPDATED_TEL_2)
            .boitePostal(UPDATED_BOITE_POSTAL)
            .decretCreation(UPDATED_DECRET_CREATION)
            .dateCreation(UPDATED_DATE_CREATION)
            .region(UPDATED_REGION)
            .autreRegion(UPDATED_AUTRE_REGION)
            .departementDakar(UPDATED_DEPARTEMENT_DAKAR)
            .departementDiourbel(UPDATED_DEPARTEMENT_DIOURBEL)
            .departementFatick(UPDATED_DEPARTEMENT_FATICK)
            .departementKaffrine(UPDATED_DEPARTEMENT_KAFFRINE)
            .departementKaolack(UPDATED_DEPARTEMENT_KAOLACK)
            .departementKedougou(UPDATED_DEPARTEMENT_KEDOUGOU)
            .departementKolda(UPDATED_DEPARTEMENT_KOLDA)
            .departementLouga(UPDATED_DEPARTEMENT_LOUGA)
            .departementMatam(UPDATED_DEPARTEMENT_MATAM)
            .departementSaint(UPDATED_DEPARTEMENT_SAINT)
            .departementSedhiou(UPDATED_DEPARTEMENT_SEDHIOU)
            .departementTambacounda(UPDATED_DEPARTEMENT_TAMBACOUNDA)
            .departementThis(UPDATED_DEPARTEMENT_THIS)
            .departementZiguinchor(UPDATED_DEPARTEMENT_ZIGUINCHOR)
            .autredepartementDakar(UPDATED_AUTREDEPARTEMENT_DAKAR)
            .autredepartementDiourbel(UPDATED_AUTREDEPARTEMENT_DIOURBEL)
            .autredepartementFatick(UPDATED_AUTREDEPARTEMENT_FATICK)
            .autredepartementKaffrine(UPDATED_AUTREDEPARTEMENT_KAFFRINE)
            .autredepartementKaolack(UPDATED_AUTREDEPARTEMENT_KAOLACK)
            .autredepartementKedougou(UPDATED_AUTREDEPARTEMENT_KEDOUGOU)
            .autredepartementKolda(UPDATED_AUTREDEPARTEMENT_KOLDA)
            .autredepartementLouga(UPDATED_AUTREDEPARTEMENT_LOUGA)
            .autredepartementMatam(UPDATED_AUTREDEPARTEMENT_MATAM)
            .autredepartementSaint(UPDATED_AUTREDEPARTEMENT_SAINT)
            .autredepartementSedhiou(UPDATED_AUTREDEPARTEMENT_SEDHIOU)
            .autredepartementTambacounda(UPDATED_AUTREDEPARTEMENT_TAMBACOUNDA)
            .autredepartementThis(UPDATED_AUTREDEPARTEMENT_THIS)
            .autredepartementZiguinchor(UPDATED_AUTREDEPARTEMENT_ZIGUINCHOR)
            .commune(UPDATED_COMMUNE)
            .ia(UPDATED_IA);
        return lyceeTechnique;
    }

    @BeforeEach
    public void initTest() {
        lyceeTechnique = createEntity(em);
    }

    @Test
    @Transactional
    void createLyceeTechnique() throws Exception {
        int databaseSizeBeforeCreate = lyceeTechniqueRepository.findAll().size();
        // Create the LyceeTechnique
        restLyceeTechniqueMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(lyceeTechnique))
            )
            .andExpect(status().isCreated());

        // Validate the LyceeTechnique in the database
        List<LyceeTechnique> lyceeTechniqueList = lyceeTechniqueRepository.findAll();
        assertThat(lyceeTechniqueList).hasSize(databaseSizeBeforeCreate + 1);
        LyceeTechnique testLyceeTechnique = lyceeTechniqueList.get(lyceeTechniqueList.size() - 1);
        assertThat(testLyceeTechnique.getPrenomNom()).isEqualTo(DEFAULT_PRENOM_NOM);
        assertThat(testLyceeTechnique.getAdresse()).isEqualTo(DEFAULT_ADRESSE);
        assertThat(testLyceeTechnique.getMail()).isEqualTo(DEFAULT_MAIL);
        assertThat(testLyceeTechnique.getTel1()).isEqualTo(DEFAULT_TEL_1);
        assertThat(testLyceeTechnique.getTel2()).isEqualTo(DEFAULT_TEL_2);
        assertThat(testLyceeTechnique.getBoitePostal()).isEqualTo(DEFAULT_BOITE_POSTAL);
        assertThat(testLyceeTechnique.getDecretCreation()).isEqualTo(DEFAULT_DECRET_CREATION);
        assertThat(testLyceeTechnique.getDateCreation()).isEqualTo(DEFAULT_DATE_CREATION);
        assertThat(testLyceeTechnique.getRegion()).isEqualTo(DEFAULT_REGION);
        assertThat(testLyceeTechnique.getAutreRegion()).isEqualTo(DEFAULT_AUTRE_REGION);
        assertThat(testLyceeTechnique.getDepartementDakar()).isEqualTo(DEFAULT_DEPARTEMENT_DAKAR);
        assertThat(testLyceeTechnique.getDepartementDiourbel()).isEqualTo(DEFAULT_DEPARTEMENT_DIOURBEL);
        assertThat(testLyceeTechnique.getDepartementFatick()).isEqualTo(DEFAULT_DEPARTEMENT_FATICK);
        assertThat(testLyceeTechnique.getDepartementKaffrine()).isEqualTo(DEFAULT_DEPARTEMENT_KAFFRINE);
        assertThat(testLyceeTechnique.getDepartementKaolack()).isEqualTo(DEFAULT_DEPARTEMENT_KAOLACK);
        assertThat(testLyceeTechnique.getDepartementKedougou()).isEqualTo(DEFAULT_DEPARTEMENT_KEDOUGOU);
        assertThat(testLyceeTechnique.getDepartementKolda()).isEqualTo(DEFAULT_DEPARTEMENT_KOLDA);
        assertThat(testLyceeTechnique.getDepartementLouga()).isEqualTo(DEFAULT_DEPARTEMENT_LOUGA);
        assertThat(testLyceeTechnique.getDepartementMatam()).isEqualTo(DEFAULT_DEPARTEMENT_MATAM);
        assertThat(testLyceeTechnique.getDepartementSaint()).isEqualTo(DEFAULT_DEPARTEMENT_SAINT);
        assertThat(testLyceeTechnique.getDepartementSedhiou()).isEqualTo(DEFAULT_DEPARTEMENT_SEDHIOU);
        assertThat(testLyceeTechnique.getDepartementTambacounda()).isEqualTo(DEFAULT_DEPARTEMENT_TAMBACOUNDA);
        assertThat(testLyceeTechnique.getDepartementThis()).isEqualTo(DEFAULT_DEPARTEMENT_THIS);
        assertThat(testLyceeTechnique.getDepartementZiguinchor()).isEqualTo(DEFAULT_DEPARTEMENT_ZIGUINCHOR);
        assertThat(testLyceeTechnique.getAutredepartementDakar()).isEqualTo(DEFAULT_AUTREDEPARTEMENT_DAKAR);
        assertThat(testLyceeTechnique.getAutredepartementDiourbel()).isEqualTo(DEFAULT_AUTREDEPARTEMENT_DIOURBEL);
        assertThat(testLyceeTechnique.getAutredepartementFatick()).isEqualTo(DEFAULT_AUTREDEPARTEMENT_FATICK);
        assertThat(testLyceeTechnique.getAutredepartementKaffrine()).isEqualTo(DEFAULT_AUTREDEPARTEMENT_KAFFRINE);
        assertThat(testLyceeTechnique.getAutredepartementKaolack()).isEqualTo(DEFAULT_AUTREDEPARTEMENT_KAOLACK);
        assertThat(testLyceeTechnique.getAutredepartementKedougou()).isEqualTo(DEFAULT_AUTREDEPARTEMENT_KEDOUGOU);
        assertThat(testLyceeTechnique.getAutredepartementKolda()).isEqualTo(DEFAULT_AUTREDEPARTEMENT_KOLDA);
        assertThat(testLyceeTechnique.getAutredepartementLouga()).isEqualTo(DEFAULT_AUTREDEPARTEMENT_LOUGA);
        assertThat(testLyceeTechnique.getAutredepartementMatam()).isEqualTo(DEFAULT_AUTREDEPARTEMENT_MATAM);
        assertThat(testLyceeTechnique.getAutredepartementSaint()).isEqualTo(DEFAULT_AUTREDEPARTEMENT_SAINT);
        assertThat(testLyceeTechnique.getAutredepartementSedhiou()).isEqualTo(DEFAULT_AUTREDEPARTEMENT_SEDHIOU);
        assertThat(testLyceeTechnique.getAutredepartementTambacounda()).isEqualTo(DEFAULT_AUTREDEPARTEMENT_TAMBACOUNDA);
        assertThat(testLyceeTechnique.getAutredepartementThis()).isEqualTo(DEFAULT_AUTREDEPARTEMENT_THIS);
        assertThat(testLyceeTechnique.getAutredepartementZiguinchor()).isEqualTo(DEFAULT_AUTREDEPARTEMENT_ZIGUINCHOR);
        assertThat(testLyceeTechnique.getCommune()).isEqualTo(DEFAULT_COMMUNE);
        assertThat(testLyceeTechnique.getIa()).isEqualTo(DEFAULT_IA);
    }

    @Test
    @Transactional
    void createLyceeTechniqueWithExistingId() throws Exception {
        // Create the LyceeTechnique with an existing ID
        lyceeTechnique.setId(1L);

        int databaseSizeBeforeCreate = lyceeTechniqueRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restLyceeTechniqueMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(lyceeTechnique))
            )
            .andExpect(status().isBadRequest());

        // Validate the LyceeTechnique in the database
        List<LyceeTechnique> lyceeTechniqueList = lyceeTechniqueRepository.findAll();
        assertThat(lyceeTechniqueList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkPrenomNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = lyceeTechniqueRepository.findAll().size();
        // set the field null
        lyceeTechnique.setPrenomNom(null);

        // Create the LyceeTechnique, which fails.

        restLyceeTechniqueMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(lyceeTechnique))
            )
            .andExpect(status().isBadRequest());

        List<LyceeTechnique> lyceeTechniqueList = lyceeTechniqueRepository.findAll();
        assertThat(lyceeTechniqueList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkAdresseIsRequired() throws Exception {
        int databaseSizeBeforeTest = lyceeTechniqueRepository.findAll().size();
        // set the field null
        lyceeTechnique.setAdresse(null);

        // Create the LyceeTechnique, which fails.

        restLyceeTechniqueMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(lyceeTechnique))
            )
            .andExpect(status().isBadRequest());

        List<LyceeTechnique> lyceeTechniqueList = lyceeTechniqueRepository.findAll();
        assertThat(lyceeTechniqueList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkMailIsRequired() throws Exception {
        int databaseSizeBeforeTest = lyceeTechniqueRepository.findAll().size();
        // set the field null
        lyceeTechnique.setMail(null);

        // Create the LyceeTechnique, which fails.

        restLyceeTechniqueMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(lyceeTechnique))
            )
            .andExpect(status().isBadRequest());

        List<LyceeTechnique> lyceeTechniqueList = lyceeTechniqueRepository.findAll();
        assertThat(lyceeTechniqueList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkTel1IsRequired() throws Exception {
        int databaseSizeBeforeTest = lyceeTechniqueRepository.findAll().size();
        // set the field null
        lyceeTechnique.setTel1(null);

        // Create the LyceeTechnique, which fails.

        restLyceeTechniqueMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(lyceeTechnique))
            )
            .andExpect(status().isBadRequest());

        List<LyceeTechnique> lyceeTechniqueList = lyceeTechniqueRepository.findAll();
        assertThat(lyceeTechniqueList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkTel2IsRequired() throws Exception {
        int databaseSizeBeforeTest = lyceeTechniqueRepository.findAll().size();
        // set the field null
        lyceeTechnique.setTel2(null);

        // Create the LyceeTechnique, which fails.

        restLyceeTechniqueMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(lyceeTechnique))
            )
            .andExpect(status().isBadRequest());

        List<LyceeTechnique> lyceeTechniqueList = lyceeTechniqueRepository.findAll();
        assertThat(lyceeTechniqueList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkBoitePostalIsRequired() throws Exception {
        int databaseSizeBeforeTest = lyceeTechniqueRepository.findAll().size();
        // set the field null
        lyceeTechnique.setBoitePostal(null);

        // Create the LyceeTechnique, which fails.

        restLyceeTechniqueMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(lyceeTechnique))
            )
            .andExpect(status().isBadRequest());

        List<LyceeTechnique> lyceeTechniqueList = lyceeTechniqueRepository.findAll();
        assertThat(lyceeTechniqueList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDecretCreationIsRequired() throws Exception {
        int databaseSizeBeforeTest = lyceeTechniqueRepository.findAll().size();
        // set the field null
        lyceeTechnique.setDecretCreation(null);

        // Create the LyceeTechnique, which fails.

        restLyceeTechniqueMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(lyceeTechnique))
            )
            .andExpect(status().isBadRequest());

        List<LyceeTechnique> lyceeTechniqueList = lyceeTechniqueRepository.findAll();
        assertThat(lyceeTechniqueList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDateCreationIsRequired() throws Exception {
        int databaseSizeBeforeTest = lyceeTechniqueRepository.findAll().size();
        // set the field null
        lyceeTechnique.setDateCreation(null);

        // Create the LyceeTechnique, which fails.

        restLyceeTechniqueMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(lyceeTechnique))
            )
            .andExpect(status().isBadRequest());

        List<LyceeTechnique> lyceeTechniqueList = lyceeTechniqueRepository.findAll();
        assertThat(lyceeTechniqueList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkRegionIsRequired() throws Exception {
        int databaseSizeBeforeTest = lyceeTechniqueRepository.findAll().size();
        // set the field null
        lyceeTechnique.setRegion(null);

        // Create the LyceeTechnique, which fails.

        restLyceeTechniqueMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(lyceeTechnique))
            )
            .andExpect(status().isBadRequest());

        List<LyceeTechnique> lyceeTechniqueList = lyceeTechniqueRepository.findAll();
        assertThat(lyceeTechniqueList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkCommuneIsRequired() throws Exception {
        int databaseSizeBeforeTest = lyceeTechniqueRepository.findAll().size();
        // set the field null
        lyceeTechnique.setCommune(null);

        // Create the LyceeTechnique, which fails.

        restLyceeTechniqueMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(lyceeTechnique))
            )
            .andExpect(status().isBadRequest());

        List<LyceeTechnique> lyceeTechniqueList = lyceeTechniqueRepository.findAll();
        assertThat(lyceeTechniqueList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkIaIsRequired() throws Exception {
        int databaseSizeBeforeTest = lyceeTechniqueRepository.findAll().size();
        // set the field null
        lyceeTechnique.setIa(null);

        // Create the LyceeTechnique, which fails.

        restLyceeTechniqueMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(lyceeTechnique))
            )
            .andExpect(status().isBadRequest());

        List<LyceeTechnique> lyceeTechniqueList = lyceeTechniqueRepository.findAll();
        assertThat(lyceeTechniqueList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllLyceeTechniques() throws Exception {
        // Initialize the database
        lyceeTechniqueRepository.saveAndFlush(lyceeTechnique);

        // Get all the lyceeTechniqueList
        restLyceeTechniqueMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lyceeTechnique.getId().intValue())))
            .andExpect(jsonPath("$.[*].prenomNom").value(hasItem(DEFAULT_PRENOM_NOM)))
            .andExpect(jsonPath("$.[*].adresse").value(hasItem(DEFAULT_ADRESSE)))
            .andExpect(jsonPath("$.[*].mail").value(hasItem(DEFAULT_MAIL)))
            .andExpect(jsonPath("$.[*].tel1").value(hasItem(DEFAULT_TEL_1)))
            .andExpect(jsonPath("$.[*].tel2").value(hasItem(DEFAULT_TEL_2)))
            .andExpect(jsonPath("$.[*].boitePostal").value(hasItem(DEFAULT_BOITE_POSTAL)))
            .andExpect(jsonPath("$.[*].decretCreation").value(hasItem(DEFAULT_DECRET_CREATION)))
            .andExpect(jsonPath("$.[*].dateCreation").value(hasItem(DEFAULT_DATE_CREATION.toString())))
            .andExpect(jsonPath("$.[*].region").value(hasItem(DEFAULT_REGION.toString())))
            .andExpect(jsonPath("$.[*].autreRegion").value(hasItem(DEFAULT_AUTRE_REGION)))
            .andExpect(jsonPath("$.[*].departementDakar").value(hasItem(DEFAULT_DEPARTEMENT_DAKAR.toString())))
            .andExpect(jsonPath("$.[*].departementDiourbel").value(hasItem(DEFAULT_DEPARTEMENT_DIOURBEL.toString())))
            .andExpect(jsonPath("$.[*].departementFatick").value(hasItem(DEFAULT_DEPARTEMENT_FATICK.toString())))
            .andExpect(jsonPath("$.[*].departementKaffrine").value(hasItem(DEFAULT_DEPARTEMENT_KAFFRINE.toString())))
            .andExpect(jsonPath("$.[*].departementKaolack").value(hasItem(DEFAULT_DEPARTEMENT_KAOLACK.toString())))
            .andExpect(jsonPath("$.[*].departementKedougou").value(hasItem(DEFAULT_DEPARTEMENT_KEDOUGOU.toString())))
            .andExpect(jsonPath("$.[*].departementKolda").value(hasItem(DEFAULT_DEPARTEMENT_KOLDA.toString())))
            .andExpect(jsonPath("$.[*].departementLouga").value(hasItem(DEFAULT_DEPARTEMENT_LOUGA.toString())))
            .andExpect(jsonPath("$.[*].departementMatam").value(hasItem(DEFAULT_DEPARTEMENT_MATAM.toString())))
            .andExpect(jsonPath("$.[*].departementSaint").value(hasItem(DEFAULT_DEPARTEMENT_SAINT.toString())))
            .andExpect(jsonPath("$.[*].departementSedhiou").value(hasItem(DEFAULT_DEPARTEMENT_SEDHIOU.toString())))
            .andExpect(jsonPath("$.[*].departementTambacounda").value(hasItem(DEFAULT_DEPARTEMENT_TAMBACOUNDA.toString())))
            .andExpect(jsonPath("$.[*].departementThis").value(hasItem(DEFAULT_DEPARTEMENT_THIS.toString())))
            .andExpect(jsonPath("$.[*].departementZiguinchor").value(hasItem(DEFAULT_DEPARTEMENT_ZIGUINCHOR.toString())))
            .andExpect(jsonPath("$.[*].autredepartementDakar").value(hasItem(DEFAULT_AUTREDEPARTEMENT_DAKAR)))
            .andExpect(jsonPath("$.[*].autredepartementDiourbel").value(hasItem(DEFAULT_AUTREDEPARTEMENT_DIOURBEL)))
            .andExpect(jsonPath("$.[*].autredepartementFatick").value(hasItem(DEFAULT_AUTREDEPARTEMENT_FATICK)))
            .andExpect(jsonPath("$.[*].autredepartementKaffrine").value(hasItem(DEFAULT_AUTREDEPARTEMENT_KAFFRINE)))
            .andExpect(jsonPath("$.[*].autredepartementKaolack").value(hasItem(DEFAULT_AUTREDEPARTEMENT_KAOLACK)))
            .andExpect(jsonPath("$.[*].autredepartementKedougou").value(hasItem(DEFAULT_AUTREDEPARTEMENT_KEDOUGOU)))
            .andExpect(jsonPath("$.[*].autredepartementKolda").value(hasItem(DEFAULT_AUTREDEPARTEMENT_KOLDA)))
            .andExpect(jsonPath("$.[*].autredepartementLouga").value(hasItem(DEFAULT_AUTREDEPARTEMENT_LOUGA)))
            .andExpect(jsonPath("$.[*].autredepartementMatam").value(hasItem(DEFAULT_AUTREDEPARTEMENT_MATAM)))
            .andExpect(jsonPath("$.[*].autredepartementSaint").value(hasItem(DEFAULT_AUTREDEPARTEMENT_SAINT)))
            .andExpect(jsonPath("$.[*].autredepartementSedhiou").value(hasItem(DEFAULT_AUTREDEPARTEMENT_SEDHIOU)))
            .andExpect(jsonPath("$.[*].autredepartementTambacounda").value(hasItem(DEFAULT_AUTREDEPARTEMENT_TAMBACOUNDA)))
            .andExpect(jsonPath("$.[*].autredepartementThis").value(hasItem(DEFAULT_AUTREDEPARTEMENT_THIS)))
            .andExpect(jsonPath("$.[*].autredepartementZiguinchor").value(hasItem(DEFAULT_AUTREDEPARTEMENT_ZIGUINCHOR)))
            .andExpect(jsonPath("$.[*].commune").value(hasItem(DEFAULT_COMMUNE)))
            .andExpect(jsonPath("$.[*].ia").value(hasItem(DEFAULT_IA)));
    }

    @Test
    @Transactional
    void getLyceeTechnique() throws Exception {
        // Initialize the database
        lyceeTechniqueRepository.saveAndFlush(lyceeTechnique);

        // Get the lyceeTechnique
        restLyceeTechniqueMockMvc
            .perform(get(ENTITY_API_URL_ID, lyceeTechnique.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(lyceeTechnique.getId().intValue()))
            .andExpect(jsonPath("$.prenomNom").value(DEFAULT_PRENOM_NOM))
            .andExpect(jsonPath("$.adresse").value(DEFAULT_ADRESSE))
            .andExpect(jsonPath("$.mail").value(DEFAULT_MAIL))
            .andExpect(jsonPath("$.tel1").value(DEFAULT_TEL_1))
            .andExpect(jsonPath("$.tel2").value(DEFAULT_TEL_2))
            .andExpect(jsonPath("$.boitePostal").value(DEFAULT_BOITE_POSTAL))
            .andExpect(jsonPath("$.decretCreation").value(DEFAULT_DECRET_CREATION))
            .andExpect(jsonPath("$.dateCreation").value(DEFAULT_DATE_CREATION.toString()))
            .andExpect(jsonPath("$.region").value(DEFAULT_REGION.toString()))
            .andExpect(jsonPath("$.autreRegion").value(DEFAULT_AUTRE_REGION))
            .andExpect(jsonPath("$.departementDakar").value(DEFAULT_DEPARTEMENT_DAKAR.toString()))
            .andExpect(jsonPath("$.departementDiourbel").value(DEFAULT_DEPARTEMENT_DIOURBEL.toString()))
            .andExpect(jsonPath("$.departementFatick").value(DEFAULT_DEPARTEMENT_FATICK.toString()))
            .andExpect(jsonPath("$.departementKaffrine").value(DEFAULT_DEPARTEMENT_KAFFRINE.toString()))
            .andExpect(jsonPath("$.departementKaolack").value(DEFAULT_DEPARTEMENT_KAOLACK.toString()))
            .andExpect(jsonPath("$.departementKedougou").value(DEFAULT_DEPARTEMENT_KEDOUGOU.toString()))
            .andExpect(jsonPath("$.departementKolda").value(DEFAULT_DEPARTEMENT_KOLDA.toString()))
            .andExpect(jsonPath("$.departementLouga").value(DEFAULT_DEPARTEMENT_LOUGA.toString()))
            .andExpect(jsonPath("$.departementMatam").value(DEFAULT_DEPARTEMENT_MATAM.toString()))
            .andExpect(jsonPath("$.departementSaint").value(DEFAULT_DEPARTEMENT_SAINT.toString()))
            .andExpect(jsonPath("$.departementSedhiou").value(DEFAULT_DEPARTEMENT_SEDHIOU.toString()))
            .andExpect(jsonPath("$.departementTambacounda").value(DEFAULT_DEPARTEMENT_TAMBACOUNDA.toString()))
            .andExpect(jsonPath("$.departementThis").value(DEFAULT_DEPARTEMENT_THIS.toString()))
            .andExpect(jsonPath("$.departementZiguinchor").value(DEFAULT_DEPARTEMENT_ZIGUINCHOR.toString()))
            .andExpect(jsonPath("$.autredepartementDakar").value(DEFAULT_AUTREDEPARTEMENT_DAKAR))
            .andExpect(jsonPath("$.autredepartementDiourbel").value(DEFAULT_AUTREDEPARTEMENT_DIOURBEL))
            .andExpect(jsonPath("$.autredepartementFatick").value(DEFAULT_AUTREDEPARTEMENT_FATICK))
            .andExpect(jsonPath("$.autredepartementKaffrine").value(DEFAULT_AUTREDEPARTEMENT_KAFFRINE))
            .andExpect(jsonPath("$.autredepartementKaolack").value(DEFAULT_AUTREDEPARTEMENT_KAOLACK))
            .andExpect(jsonPath("$.autredepartementKedougou").value(DEFAULT_AUTREDEPARTEMENT_KEDOUGOU))
            .andExpect(jsonPath("$.autredepartementKolda").value(DEFAULT_AUTREDEPARTEMENT_KOLDA))
            .andExpect(jsonPath("$.autredepartementLouga").value(DEFAULT_AUTREDEPARTEMENT_LOUGA))
            .andExpect(jsonPath("$.autredepartementMatam").value(DEFAULT_AUTREDEPARTEMENT_MATAM))
            .andExpect(jsonPath("$.autredepartementSaint").value(DEFAULT_AUTREDEPARTEMENT_SAINT))
            .andExpect(jsonPath("$.autredepartementSedhiou").value(DEFAULT_AUTREDEPARTEMENT_SEDHIOU))
            .andExpect(jsonPath("$.autredepartementTambacounda").value(DEFAULT_AUTREDEPARTEMENT_TAMBACOUNDA))
            .andExpect(jsonPath("$.autredepartementThis").value(DEFAULT_AUTREDEPARTEMENT_THIS))
            .andExpect(jsonPath("$.autredepartementZiguinchor").value(DEFAULT_AUTREDEPARTEMENT_ZIGUINCHOR))
            .andExpect(jsonPath("$.commune").value(DEFAULT_COMMUNE))
            .andExpect(jsonPath("$.ia").value(DEFAULT_IA));
    }

    @Test
    @Transactional
    void getNonExistingLyceeTechnique() throws Exception {
        // Get the lyceeTechnique
        restLyceeTechniqueMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewLyceeTechnique() throws Exception {
        // Initialize the database
        lyceeTechniqueRepository.saveAndFlush(lyceeTechnique);

        int databaseSizeBeforeUpdate = lyceeTechniqueRepository.findAll().size();

        // Update the lyceeTechnique
        LyceeTechnique updatedLyceeTechnique = lyceeTechniqueRepository.findById(lyceeTechnique.getId()).get();
        // Disconnect from session so that the updates on updatedLyceeTechnique are not directly saved in db
        em.detach(updatedLyceeTechnique);
        updatedLyceeTechnique
            .prenomNom(UPDATED_PRENOM_NOM)
            .adresse(UPDATED_ADRESSE)
            .mail(UPDATED_MAIL)
            .tel1(UPDATED_TEL_1)
            .tel2(UPDATED_TEL_2)
            .boitePostal(UPDATED_BOITE_POSTAL)
            .decretCreation(UPDATED_DECRET_CREATION)
            .dateCreation(UPDATED_DATE_CREATION)
            .region(UPDATED_REGION)
            .autreRegion(UPDATED_AUTRE_REGION)
            .departementDakar(UPDATED_DEPARTEMENT_DAKAR)
            .departementDiourbel(UPDATED_DEPARTEMENT_DIOURBEL)
            .departementFatick(UPDATED_DEPARTEMENT_FATICK)
            .departementKaffrine(UPDATED_DEPARTEMENT_KAFFRINE)
            .departementKaolack(UPDATED_DEPARTEMENT_KAOLACK)
            .departementKedougou(UPDATED_DEPARTEMENT_KEDOUGOU)
            .departementKolda(UPDATED_DEPARTEMENT_KOLDA)
            .departementLouga(UPDATED_DEPARTEMENT_LOUGA)
            .departementMatam(UPDATED_DEPARTEMENT_MATAM)
            .departementSaint(UPDATED_DEPARTEMENT_SAINT)
            .departementSedhiou(UPDATED_DEPARTEMENT_SEDHIOU)
            .departementTambacounda(UPDATED_DEPARTEMENT_TAMBACOUNDA)
            .departementThis(UPDATED_DEPARTEMENT_THIS)
            .departementZiguinchor(UPDATED_DEPARTEMENT_ZIGUINCHOR)
            .autredepartementDakar(UPDATED_AUTREDEPARTEMENT_DAKAR)
            .autredepartementDiourbel(UPDATED_AUTREDEPARTEMENT_DIOURBEL)
            .autredepartementFatick(UPDATED_AUTREDEPARTEMENT_FATICK)
            .autredepartementKaffrine(UPDATED_AUTREDEPARTEMENT_KAFFRINE)
            .autredepartementKaolack(UPDATED_AUTREDEPARTEMENT_KAOLACK)
            .autredepartementKedougou(UPDATED_AUTREDEPARTEMENT_KEDOUGOU)
            .autredepartementKolda(UPDATED_AUTREDEPARTEMENT_KOLDA)
            .autredepartementLouga(UPDATED_AUTREDEPARTEMENT_LOUGA)
            .autredepartementMatam(UPDATED_AUTREDEPARTEMENT_MATAM)
            .autredepartementSaint(UPDATED_AUTREDEPARTEMENT_SAINT)
            .autredepartementSedhiou(UPDATED_AUTREDEPARTEMENT_SEDHIOU)
            .autredepartementTambacounda(UPDATED_AUTREDEPARTEMENT_TAMBACOUNDA)
            .autredepartementThis(UPDATED_AUTREDEPARTEMENT_THIS)
            .autredepartementZiguinchor(UPDATED_AUTREDEPARTEMENT_ZIGUINCHOR)
            .commune(UPDATED_COMMUNE)
            .ia(UPDATED_IA);

        restLyceeTechniqueMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedLyceeTechnique.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedLyceeTechnique))
            )
            .andExpect(status().isOk());

        // Validate the LyceeTechnique in the database
        List<LyceeTechnique> lyceeTechniqueList = lyceeTechniqueRepository.findAll();
        assertThat(lyceeTechniqueList).hasSize(databaseSizeBeforeUpdate);
        LyceeTechnique testLyceeTechnique = lyceeTechniqueList.get(lyceeTechniqueList.size() - 1);
        assertThat(testLyceeTechnique.getPrenomNom()).isEqualTo(UPDATED_PRENOM_NOM);
        assertThat(testLyceeTechnique.getAdresse()).isEqualTo(UPDATED_ADRESSE);
        assertThat(testLyceeTechnique.getMail()).isEqualTo(UPDATED_MAIL);
        assertThat(testLyceeTechnique.getTel1()).isEqualTo(UPDATED_TEL_1);
        assertThat(testLyceeTechnique.getTel2()).isEqualTo(UPDATED_TEL_2);
        assertThat(testLyceeTechnique.getBoitePostal()).isEqualTo(UPDATED_BOITE_POSTAL);
        assertThat(testLyceeTechnique.getDecretCreation()).isEqualTo(UPDATED_DECRET_CREATION);
        assertThat(testLyceeTechnique.getDateCreation()).isEqualTo(UPDATED_DATE_CREATION);
        assertThat(testLyceeTechnique.getRegion()).isEqualTo(UPDATED_REGION);
        assertThat(testLyceeTechnique.getAutreRegion()).isEqualTo(UPDATED_AUTRE_REGION);
        assertThat(testLyceeTechnique.getDepartementDakar()).isEqualTo(UPDATED_DEPARTEMENT_DAKAR);
        assertThat(testLyceeTechnique.getDepartementDiourbel()).isEqualTo(UPDATED_DEPARTEMENT_DIOURBEL);
        assertThat(testLyceeTechnique.getDepartementFatick()).isEqualTo(UPDATED_DEPARTEMENT_FATICK);
        assertThat(testLyceeTechnique.getDepartementKaffrine()).isEqualTo(UPDATED_DEPARTEMENT_KAFFRINE);
        assertThat(testLyceeTechnique.getDepartementKaolack()).isEqualTo(UPDATED_DEPARTEMENT_KAOLACK);
        assertThat(testLyceeTechnique.getDepartementKedougou()).isEqualTo(UPDATED_DEPARTEMENT_KEDOUGOU);
        assertThat(testLyceeTechnique.getDepartementKolda()).isEqualTo(UPDATED_DEPARTEMENT_KOLDA);
        assertThat(testLyceeTechnique.getDepartementLouga()).isEqualTo(UPDATED_DEPARTEMENT_LOUGA);
        assertThat(testLyceeTechnique.getDepartementMatam()).isEqualTo(UPDATED_DEPARTEMENT_MATAM);
        assertThat(testLyceeTechnique.getDepartementSaint()).isEqualTo(UPDATED_DEPARTEMENT_SAINT);
        assertThat(testLyceeTechnique.getDepartementSedhiou()).isEqualTo(UPDATED_DEPARTEMENT_SEDHIOU);
        assertThat(testLyceeTechnique.getDepartementTambacounda()).isEqualTo(UPDATED_DEPARTEMENT_TAMBACOUNDA);
        assertThat(testLyceeTechnique.getDepartementThis()).isEqualTo(UPDATED_DEPARTEMENT_THIS);
        assertThat(testLyceeTechnique.getDepartementZiguinchor()).isEqualTo(UPDATED_DEPARTEMENT_ZIGUINCHOR);
        assertThat(testLyceeTechnique.getAutredepartementDakar()).isEqualTo(UPDATED_AUTREDEPARTEMENT_DAKAR);
        assertThat(testLyceeTechnique.getAutredepartementDiourbel()).isEqualTo(UPDATED_AUTREDEPARTEMENT_DIOURBEL);
        assertThat(testLyceeTechnique.getAutredepartementFatick()).isEqualTo(UPDATED_AUTREDEPARTEMENT_FATICK);
        assertThat(testLyceeTechnique.getAutredepartementKaffrine()).isEqualTo(UPDATED_AUTREDEPARTEMENT_KAFFRINE);
        assertThat(testLyceeTechnique.getAutredepartementKaolack()).isEqualTo(UPDATED_AUTREDEPARTEMENT_KAOLACK);
        assertThat(testLyceeTechnique.getAutredepartementKedougou()).isEqualTo(UPDATED_AUTREDEPARTEMENT_KEDOUGOU);
        assertThat(testLyceeTechnique.getAutredepartementKolda()).isEqualTo(UPDATED_AUTREDEPARTEMENT_KOLDA);
        assertThat(testLyceeTechnique.getAutredepartementLouga()).isEqualTo(UPDATED_AUTREDEPARTEMENT_LOUGA);
        assertThat(testLyceeTechnique.getAutredepartementMatam()).isEqualTo(UPDATED_AUTREDEPARTEMENT_MATAM);
        assertThat(testLyceeTechnique.getAutredepartementSaint()).isEqualTo(UPDATED_AUTREDEPARTEMENT_SAINT);
        assertThat(testLyceeTechnique.getAutredepartementSedhiou()).isEqualTo(UPDATED_AUTREDEPARTEMENT_SEDHIOU);
        assertThat(testLyceeTechnique.getAutredepartementTambacounda()).isEqualTo(UPDATED_AUTREDEPARTEMENT_TAMBACOUNDA);
        assertThat(testLyceeTechnique.getAutredepartementThis()).isEqualTo(UPDATED_AUTREDEPARTEMENT_THIS);
        assertThat(testLyceeTechnique.getAutredepartementZiguinchor()).isEqualTo(UPDATED_AUTREDEPARTEMENT_ZIGUINCHOR);
        assertThat(testLyceeTechnique.getCommune()).isEqualTo(UPDATED_COMMUNE);
        assertThat(testLyceeTechnique.getIa()).isEqualTo(UPDATED_IA);
    }

    @Test
    @Transactional
    void putNonExistingLyceeTechnique() throws Exception {
        int databaseSizeBeforeUpdate = lyceeTechniqueRepository.findAll().size();
        lyceeTechnique.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLyceeTechniqueMockMvc
            .perform(
                put(ENTITY_API_URL_ID, lyceeTechnique.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(lyceeTechnique))
            )
            .andExpect(status().isBadRequest());

        // Validate the LyceeTechnique in the database
        List<LyceeTechnique> lyceeTechniqueList = lyceeTechniqueRepository.findAll();
        assertThat(lyceeTechniqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchLyceeTechnique() throws Exception {
        int databaseSizeBeforeUpdate = lyceeTechniqueRepository.findAll().size();
        lyceeTechnique.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLyceeTechniqueMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(lyceeTechnique))
            )
            .andExpect(status().isBadRequest());

        // Validate the LyceeTechnique in the database
        List<LyceeTechnique> lyceeTechniqueList = lyceeTechniqueRepository.findAll();
        assertThat(lyceeTechniqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamLyceeTechnique() throws Exception {
        int databaseSizeBeforeUpdate = lyceeTechniqueRepository.findAll().size();
        lyceeTechnique.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLyceeTechniqueMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(lyceeTechnique)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the LyceeTechnique in the database
        List<LyceeTechnique> lyceeTechniqueList = lyceeTechniqueRepository.findAll();
        assertThat(lyceeTechniqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateLyceeTechniqueWithPatch() throws Exception {
        // Initialize the database
        lyceeTechniqueRepository.saveAndFlush(lyceeTechnique);

        int databaseSizeBeforeUpdate = lyceeTechniqueRepository.findAll().size();

        // Update the lyceeTechnique using partial update
        LyceeTechnique partialUpdatedLyceeTechnique = new LyceeTechnique();
        partialUpdatedLyceeTechnique.setId(lyceeTechnique.getId());

        partialUpdatedLyceeTechnique
            .tel2(UPDATED_TEL_2)
            .boitePostal(UPDATED_BOITE_POSTAL)
            .dateCreation(UPDATED_DATE_CREATION)
            .departementDakar(UPDATED_DEPARTEMENT_DAKAR)
            .departementFatick(UPDATED_DEPARTEMENT_FATICK)
            .departementKaolack(UPDATED_DEPARTEMENT_KAOLACK)
            .departementKedougou(UPDATED_DEPARTEMENT_KEDOUGOU)
            .departementSaint(UPDATED_DEPARTEMENT_SAINT)
            .departementThis(UPDATED_DEPARTEMENT_THIS)
            .departementZiguinchor(UPDATED_DEPARTEMENT_ZIGUINCHOR)
            .autredepartementDakar(UPDATED_AUTREDEPARTEMENT_DAKAR)
            .autredepartementDiourbel(UPDATED_AUTREDEPARTEMENT_DIOURBEL)
            .autredepartementFatick(UPDATED_AUTREDEPARTEMENT_FATICK)
            .autredepartementKaffrine(UPDATED_AUTREDEPARTEMENT_KAFFRINE)
            .autredepartementKaolack(UPDATED_AUTREDEPARTEMENT_KAOLACK)
            .autredepartementKolda(UPDATED_AUTREDEPARTEMENT_KOLDA)
            .autredepartementLouga(UPDATED_AUTREDEPARTEMENT_LOUGA)
            .autredepartementMatam(UPDATED_AUTREDEPARTEMENT_MATAM)
            .autredepartementSaint(UPDATED_AUTREDEPARTEMENT_SAINT)
            .autredepartementTambacounda(UPDATED_AUTREDEPARTEMENT_TAMBACOUNDA)
            .autredepartementZiguinchor(UPDATED_AUTREDEPARTEMENT_ZIGUINCHOR)
            .ia(UPDATED_IA);

        restLyceeTechniqueMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLyceeTechnique.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLyceeTechnique))
            )
            .andExpect(status().isOk());

        // Validate the LyceeTechnique in the database
        List<LyceeTechnique> lyceeTechniqueList = lyceeTechniqueRepository.findAll();
        assertThat(lyceeTechniqueList).hasSize(databaseSizeBeforeUpdate);
        LyceeTechnique testLyceeTechnique = lyceeTechniqueList.get(lyceeTechniqueList.size() - 1);
        assertThat(testLyceeTechnique.getPrenomNom()).isEqualTo(DEFAULT_PRENOM_NOM);
        assertThat(testLyceeTechnique.getAdresse()).isEqualTo(DEFAULT_ADRESSE);
        assertThat(testLyceeTechnique.getMail()).isEqualTo(DEFAULT_MAIL);
        assertThat(testLyceeTechnique.getTel1()).isEqualTo(DEFAULT_TEL_1);
        assertThat(testLyceeTechnique.getTel2()).isEqualTo(UPDATED_TEL_2);
        assertThat(testLyceeTechnique.getBoitePostal()).isEqualTo(UPDATED_BOITE_POSTAL);
        assertThat(testLyceeTechnique.getDecretCreation()).isEqualTo(DEFAULT_DECRET_CREATION);
        assertThat(testLyceeTechnique.getDateCreation()).isEqualTo(UPDATED_DATE_CREATION);
        assertThat(testLyceeTechnique.getRegion()).isEqualTo(DEFAULT_REGION);
        assertThat(testLyceeTechnique.getAutreRegion()).isEqualTo(DEFAULT_AUTRE_REGION);
        assertThat(testLyceeTechnique.getDepartementDakar()).isEqualTo(UPDATED_DEPARTEMENT_DAKAR);
        assertThat(testLyceeTechnique.getDepartementDiourbel()).isEqualTo(DEFAULT_DEPARTEMENT_DIOURBEL);
        assertThat(testLyceeTechnique.getDepartementFatick()).isEqualTo(UPDATED_DEPARTEMENT_FATICK);
        assertThat(testLyceeTechnique.getDepartementKaffrine()).isEqualTo(DEFAULT_DEPARTEMENT_KAFFRINE);
        assertThat(testLyceeTechnique.getDepartementKaolack()).isEqualTo(UPDATED_DEPARTEMENT_KAOLACK);
        assertThat(testLyceeTechnique.getDepartementKedougou()).isEqualTo(UPDATED_DEPARTEMENT_KEDOUGOU);
        assertThat(testLyceeTechnique.getDepartementKolda()).isEqualTo(DEFAULT_DEPARTEMENT_KOLDA);
        assertThat(testLyceeTechnique.getDepartementLouga()).isEqualTo(DEFAULT_DEPARTEMENT_LOUGA);
        assertThat(testLyceeTechnique.getDepartementMatam()).isEqualTo(DEFAULT_DEPARTEMENT_MATAM);
        assertThat(testLyceeTechnique.getDepartementSaint()).isEqualTo(UPDATED_DEPARTEMENT_SAINT);
        assertThat(testLyceeTechnique.getDepartementSedhiou()).isEqualTo(DEFAULT_DEPARTEMENT_SEDHIOU);
        assertThat(testLyceeTechnique.getDepartementTambacounda()).isEqualTo(DEFAULT_DEPARTEMENT_TAMBACOUNDA);
        assertThat(testLyceeTechnique.getDepartementThis()).isEqualTo(UPDATED_DEPARTEMENT_THIS);
        assertThat(testLyceeTechnique.getDepartementZiguinchor()).isEqualTo(UPDATED_DEPARTEMENT_ZIGUINCHOR);
        assertThat(testLyceeTechnique.getAutredepartementDakar()).isEqualTo(UPDATED_AUTREDEPARTEMENT_DAKAR);
        assertThat(testLyceeTechnique.getAutredepartementDiourbel()).isEqualTo(UPDATED_AUTREDEPARTEMENT_DIOURBEL);
        assertThat(testLyceeTechnique.getAutredepartementFatick()).isEqualTo(UPDATED_AUTREDEPARTEMENT_FATICK);
        assertThat(testLyceeTechnique.getAutredepartementKaffrine()).isEqualTo(UPDATED_AUTREDEPARTEMENT_KAFFRINE);
        assertThat(testLyceeTechnique.getAutredepartementKaolack()).isEqualTo(UPDATED_AUTREDEPARTEMENT_KAOLACK);
        assertThat(testLyceeTechnique.getAutredepartementKedougou()).isEqualTo(DEFAULT_AUTREDEPARTEMENT_KEDOUGOU);
        assertThat(testLyceeTechnique.getAutredepartementKolda()).isEqualTo(UPDATED_AUTREDEPARTEMENT_KOLDA);
        assertThat(testLyceeTechnique.getAutredepartementLouga()).isEqualTo(UPDATED_AUTREDEPARTEMENT_LOUGA);
        assertThat(testLyceeTechnique.getAutredepartementMatam()).isEqualTo(UPDATED_AUTREDEPARTEMENT_MATAM);
        assertThat(testLyceeTechnique.getAutredepartementSaint()).isEqualTo(UPDATED_AUTREDEPARTEMENT_SAINT);
        assertThat(testLyceeTechnique.getAutredepartementSedhiou()).isEqualTo(DEFAULT_AUTREDEPARTEMENT_SEDHIOU);
        assertThat(testLyceeTechnique.getAutredepartementTambacounda()).isEqualTo(UPDATED_AUTREDEPARTEMENT_TAMBACOUNDA);
        assertThat(testLyceeTechnique.getAutredepartementThis()).isEqualTo(DEFAULT_AUTREDEPARTEMENT_THIS);
        assertThat(testLyceeTechnique.getAutredepartementZiguinchor()).isEqualTo(UPDATED_AUTREDEPARTEMENT_ZIGUINCHOR);
        assertThat(testLyceeTechnique.getCommune()).isEqualTo(DEFAULT_COMMUNE);
        assertThat(testLyceeTechnique.getIa()).isEqualTo(UPDATED_IA);
    }

    @Test
    @Transactional
    void fullUpdateLyceeTechniqueWithPatch() throws Exception {
        // Initialize the database
        lyceeTechniqueRepository.saveAndFlush(lyceeTechnique);

        int databaseSizeBeforeUpdate = lyceeTechniqueRepository.findAll().size();

        // Update the lyceeTechnique using partial update
        LyceeTechnique partialUpdatedLyceeTechnique = new LyceeTechnique();
        partialUpdatedLyceeTechnique.setId(lyceeTechnique.getId());

        partialUpdatedLyceeTechnique
            .prenomNom(UPDATED_PRENOM_NOM)
            .adresse(UPDATED_ADRESSE)
            .mail(UPDATED_MAIL)
            .tel1(UPDATED_TEL_1)
            .tel2(UPDATED_TEL_2)
            .boitePostal(UPDATED_BOITE_POSTAL)
            .decretCreation(UPDATED_DECRET_CREATION)
            .dateCreation(UPDATED_DATE_CREATION)
            .region(UPDATED_REGION)
            .autreRegion(UPDATED_AUTRE_REGION)
            .departementDakar(UPDATED_DEPARTEMENT_DAKAR)
            .departementDiourbel(UPDATED_DEPARTEMENT_DIOURBEL)
            .departementFatick(UPDATED_DEPARTEMENT_FATICK)
            .departementKaffrine(UPDATED_DEPARTEMENT_KAFFRINE)
            .departementKaolack(UPDATED_DEPARTEMENT_KAOLACK)
            .departementKedougou(UPDATED_DEPARTEMENT_KEDOUGOU)
            .departementKolda(UPDATED_DEPARTEMENT_KOLDA)
            .departementLouga(UPDATED_DEPARTEMENT_LOUGA)
            .departementMatam(UPDATED_DEPARTEMENT_MATAM)
            .departementSaint(UPDATED_DEPARTEMENT_SAINT)
            .departementSedhiou(UPDATED_DEPARTEMENT_SEDHIOU)
            .departementTambacounda(UPDATED_DEPARTEMENT_TAMBACOUNDA)
            .departementThis(UPDATED_DEPARTEMENT_THIS)
            .departementZiguinchor(UPDATED_DEPARTEMENT_ZIGUINCHOR)
            .autredepartementDakar(UPDATED_AUTREDEPARTEMENT_DAKAR)
            .autredepartementDiourbel(UPDATED_AUTREDEPARTEMENT_DIOURBEL)
            .autredepartementFatick(UPDATED_AUTREDEPARTEMENT_FATICK)
            .autredepartementKaffrine(UPDATED_AUTREDEPARTEMENT_KAFFRINE)
            .autredepartementKaolack(UPDATED_AUTREDEPARTEMENT_KAOLACK)
            .autredepartementKedougou(UPDATED_AUTREDEPARTEMENT_KEDOUGOU)
            .autredepartementKolda(UPDATED_AUTREDEPARTEMENT_KOLDA)
            .autredepartementLouga(UPDATED_AUTREDEPARTEMENT_LOUGA)
            .autredepartementMatam(UPDATED_AUTREDEPARTEMENT_MATAM)
            .autredepartementSaint(UPDATED_AUTREDEPARTEMENT_SAINT)
            .autredepartementSedhiou(UPDATED_AUTREDEPARTEMENT_SEDHIOU)
            .autredepartementTambacounda(UPDATED_AUTREDEPARTEMENT_TAMBACOUNDA)
            .autredepartementThis(UPDATED_AUTREDEPARTEMENT_THIS)
            .autredepartementZiguinchor(UPDATED_AUTREDEPARTEMENT_ZIGUINCHOR)
            .commune(UPDATED_COMMUNE)
            .ia(UPDATED_IA);

        restLyceeTechniqueMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLyceeTechnique.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLyceeTechnique))
            )
            .andExpect(status().isOk());

        // Validate the LyceeTechnique in the database
        List<LyceeTechnique> lyceeTechniqueList = lyceeTechniqueRepository.findAll();
        assertThat(lyceeTechniqueList).hasSize(databaseSizeBeforeUpdate);
        LyceeTechnique testLyceeTechnique = lyceeTechniqueList.get(lyceeTechniqueList.size() - 1);
        assertThat(testLyceeTechnique.getPrenomNom()).isEqualTo(UPDATED_PRENOM_NOM);
        assertThat(testLyceeTechnique.getAdresse()).isEqualTo(UPDATED_ADRESSE);
        assertThat(testLyceeTechnique.getMail()).isEqualTo(UPDATED_MAIL);
        assertThat(testLyceeTechnique.getTel1()).isEqualTo(UPDATED_TEL_1);
        assertThat(testLyceeTechnique.getTel2()).isEqualTo(UPDATED_TEL_2);
        assertThat(testLyceeTechnique.getBoitePostal()).isEqualTo(UPDATED_BOITE_POSTAL);
        assertThat(testLyceeTechnique.getDecretCreation()).isEqualTo(UPDATED_DECRET_CREATION);
        assertThat(testLyceeTechnique.getDateCreation()).isEqualTo(UPDATED_DATE_CREATION);
        assertThat(testLyceeTechnique.getRegion()).isEqualTo(UPDATED_REGION);
        assertThat(testLyceeTechnique.getAutreRegion()).isEqualTo(UPDATED_AUTRE_REGION);
        assertThat(testLyceeTechnique.getDepartementDakar()).isEqualTo(UPDATED_DEPARTEMENT_DAKAR);
        assertThat(testLyceeTechnique.getDepartementDiourbel()).isEqualTo(UPDATED_DEPARTEMENT_DIOURBEL);
        assertThat(testLyceeTechnique.getDepartementFatick()).isEqualTo(UPDATED_DEPARTEMENT_FATICK);
        assertThat(testLyceeTechnique.getDepartementKaffrine()).isEqualTo(UPDATED_DEPARTEMENT_KAFFRINE);
        assertThat(testLyceeTechnique.getDepartementKaolack()).isEqualTo(UPDATED_DEPARTEMENT_KAOLACK);
        assertThat(testLyceeTechnique.getDepartementKedougou()).isEqualTo(UPDATED_DEPARTEMENT_KEDOUGOU);
        assertThat(testLyceeTechnique.getDepartementKolda()).isEqualTo(UPDATED_DEPARTEMENT_KOLDA);
        assertThat(testLyceeTechnique.getDepartementLouga()).isEqualTo(UPDATED_DEPARTEMENT_LOUGA);
        assertThat(testLyceeTechnique.getDepartementMatam()).isEqualTo(UPDATED_DEPARTEMENT_MATAM);
        assertThat(testLyceeTechnique.getDepartementSaint()).isEqualTo(UPDATED_DEPARTEMENT_SAINT);
        assertThat(testLyceeTechnique.getDepartementSedhiou()).isEqualTo(UPDATED_DEPARTEMENT_SEDHIOU);
        assertThat(testLyceeTechnique.getDepartementTambacounda()).isEqualTo(UPDATED_DEPARTEMENT_TAMBACOUNDA);
        assertThat(testLyceeTechnique.getDepartementThis()).isEqualTo(UPDATED_DEPARTEMENT_THIS);
        assertThat(testLyceeTechnique.getDepartementZiguinchor()).isEqualTo(UPDATED_DEPARTEMENT_ZIGUINCHOR);
        assertThat(testLyceeTechnique.getAutredepartementDakar()).isEqualTo(UPDATED_AUTREDEPARTEMENT_DAKAR);
        assertThat(testLyceeTechnique.getAutredepartementDiourbel()).isEqualTo(UPDATED_AUTREDEPARTEMENT_DIOURBEL);
        assertThat(testLyceeTechnique.getAutredepartementFatick()).isEqualTo(UPDATED_AUTREDEPARTEMENT_FATICK);
        assertThat(testLyceeTechnique.getAutredepartementKaffrine()).isEqualTo(UPDATED_AUTREDEPARTEMENT_KAFFRINE);
        assertThat(testLyceeTechnique.getAutredepartementKaolack()).isEqualTo(UPDATED_AUTREDEPARTEMENT_KAOLACK);
        assertThat(testLyceeTechnique.getAutredepartementKedougou()).isEqualTo(UPDATED_AUTREDEPARTEMENT_KEDOUGOU);
        assertThat(testLyceeTechnique.getAutredepartementKolda()).isEqualTo(UPDATED_AUTREDEPARTEMENT_KOLDA);
        assertThat(testLyceeTechnique.getAutredepartementLouga()).isEqualTo(UPDATED_AUTREDEPARTEMENT_LOUGA);
        assertThat(testLyceeTechnique.getAutredepartementMatam()).isEqualTo(UPDATED_AUTREDEPARTEMENT_MATAM);
        assertThat(testLyceeTechnique.getAutredepartementSaint()).isEqualTo(UPDATED_AUTREDEPARTEMENT_SAINT);
        assertThat(testLyceeTechnique.getAutredepartementSedhiou()).isEqualTo(UPDATED_AUTREDEPARTEMENT_SEDHIOU);
        assertThat(testLyceeTechnique.getAutredepartementTambacounda()).isEqualTo(UPDATED_AUTREDEPARTEMENT_TAMBACOUNDA);
        assertThat(testLyceeTechnique.getAutredepartementThis()).isEqualTo(UPDATED_AUTREDEPARTEMENT_THIS);
        assertThat(testLyceeTechnique.getAutredepartementZiguinchor()).isEqualTo(UPDATED_AUTREDEPARTEMENT_ZIGUINCHOR);
        assertThat(testLyceeTechnique.getCommune()).isEqualTo(UPDATED_COMMUNE);
        assertThat(testLyceeTechnique.getIa()).isEqualTo(UPDATED_IA);
    }

    @Test
    @Transactional
    void patchNonExistingLyceeTechnique() throws Exception {
        int databaseSizeBeforeUpdate = lyceeTechniqueRepository.findAll().size();
        lyceeTechnique.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLyceeTechniqueMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, lyceeTechnique.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(lyceeTechnique))
            )
            .andExpect(status().isBadRequest());

        // Validate the LyceeTechnique in the database
        List<LyceeTechnique> lyceeTechniqueList = lyceeTechniqueRepository.findAll();
        assertThat(lyceeTechniqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchLyceeTechnique() throws Exception {
        int databaseSizeBeforeUpdate = lyceeTechniqueRepository.findAll().size();
        lyceeTechnique.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLyceeTechniqueMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(lyceeTechnique))
            )
            .andExpect(status().isBadRequest());

        // Validate the LyceeTechnique in the database
        List<LyceeTechnique> lyceeTechniqueList = lyceeTechniqueRepository.findAll();
        assertThat(lyceeTechniqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamLyceeTechnique() throws Exception {
        int databaseSizeBeforeUpdate = lyceeTechniqueRepository.findAll().size();
        lyceeTechnique.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLyceeTechniqueMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(lyceeTechnique))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the LyceeTechnique in the database
        List<LyceeTechnique> lyceeTechniqueList = lyceeTechniqueRepository.findAll();
        assertThat(lyceeTechniqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteLyceeTechnique() throws Exception {
        // Initialize the database
        lyceeTechniqueRepository.saveAndFlush(lyceeTechnique);

        int databaseSizeBeforeDelete = lyceeTechniqueRepository.findAll().size();

        // Delete the lyceeTechnique
        restLyceeTechniqueMockMvc
            .perform(delete(ENTITY_API_URL_ID, lyceeTechnique.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LyceeTechnique> lyceeTechniqueList = lyceeTechniqueRepository.findAll();
        assertThat(lyceeTechniqueList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
