package mefpai.gouv.sn.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import mefpai.gouv.sn.IntegrationTest;
import mefpai.gouv.sn.domain.Localisation;
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
import mefpai.gouv.sn.repository.LocalisationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link LocalisationResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class LocalisationResourceIT {

    private static final Region DEFAULT_REGION = Region.DAKAR;
    private static final Region UPDATED_REGION = Region.DIOURBEL;

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

    private static final ZIGINCHOR DEFAULT_DEPARTEMENT_ZIC = ZIGINCHOR.BIGNONA;
    private static final ZIGINCHOR UPDATED_DEPARTEMENT_ZIC = ZIGINCHOR.OUSSOUYE;

    private static final String DEFAULT_IA = "AAAAAAAAAA";
    private static final String UPDATED_IA = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/localisations";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private LocalisationRepository localisationRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLocalisationMockMvc;

    private Localisation localisation;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Localisation createEntity(EntityManager em) {
        Localisation localisation = new Localisation()
            .region(DEFAULT_REGION)
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
            .departementZic(DEFAULT_DEPARTEMENT_ZIC)
            .ia(DEFAULT_IA);
        return localisation;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Localisation createUpdatedEntity(EntityManager em) {
        Localisation localisation = new Localisation()
            .region(UPDATED_REGION)
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
            .departementZic(UPDATED_DEPARTEMENT_ZIC)
            .ia(UPDATED_IA);
        return localisation;
    }

    @BeforeEach
    public void initTest() {
        localisation = createEntity(em);
    }

    @Test
    @Transactional
    void createLocalisation() throws Exception {
        int databaseSizeBeforeCreate = localisationRepository.findAll().size();
        // Create the Localisation
        restLocalisationMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(localisation)))
            .andExpect(status().isCreated());

        // Validate the Localisation in the database
        List<Localisation> localisationList = localisationRepository.findAll();
        assertThat(localisationList).hasSize(databaseSizeBeforeCreate + 1);
        Localisation testLocalisation = localisationList.get(localisationList.size() - 1);
        assertThat(testLocalisation.getRegion()).isEqualTo(DEFAULT_REGION);
        assertThat(testLocalisation.getDepartementDakar()).isEqualTo(DEFAULT_DEPARTEMENT_DAKAR);
        assertThat(testLocalisation.getDepartementDiourbel()).isEqualTo(DEFAULT_DEPARTEMENT_DIOURBEL);
        assertThat(testLocalisation.getDepartementFatick()).isEqualTo(DEFAULT_DEPARTEMENT_FATICK);
        assertThat(testLocalisation.getDepartementKaffrine()).isEqualTo(DEFAULT_DEPARTEMENT_KAFFRINE);
        assertThat(testLocalisation.getDepartementKaolack()).isEqualTo(DEFAULT_DEPARTEMENT_KAOLACK);
        assertThat(testLocalisation.getDepartementKedougou()).isEqualTo(DEFAULT_DEPARTEMENT_KEDOUGOU);
        assertThat(testLocalisation.getDepartementKolda()).isEqualTo(DEFAULT_DEPARTEMENT_KOLDA);
        assertThat(testLocalisation.getDepartementLouga()).isEqualTo(DEFAULT_DEPARTEMENT_LOUGA);
        assertThat(testLocalisation.getDepartementMatam()).isEqualTo(DEFAULT_DEPARTEMENT_MATAM);
        assertThat(testLocalisation.getDepartementSaint()).isEqualTo(DEFAULT_DEPARTEMENT_SAINT);
        assertThat(testLocalisation.getDepartementSedhiou()).isEqualTo(DEFAULT_DEPARTEMENT_SEDHIOU);
        assertThat(testLocalisation.getDepartementTambacounda()).isEqualTo(DEFAULT_DEPARTEMENT_TAMBACOUNDA);
        assertThat(testLocalisation.getDepartementThis()).isEqualTo(DEFAULT_DEPARTEMENT_THIS);
        assertThat(testLocalisation.getDepartementZic()).isEqualTo(DEFAULT_DEPARTEMENT_ZIC);
        assertThat(testLocalisation.getIa()).isEqualTo(DEFAULT_IA);
    }

    @Test
    @Transactional
    void createLocalisationWithExistingId() throws Exception {
        // Create the Localisation with an existing ID
        localisation.setId(1L);

        int databaseSizeBeforeCreate = localisationRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restLocalisationMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(localisation)))
            .andExpect(status().isBadRequest());

        // Validate the Localisation in the database
        List<Localisation> localisationList = localisationRepository.findAll();
        assertThat(localisationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllLocalisations() throws Exception {
        // Initialize the database
        localisationRepository.saveAndFlush(localisation);

        // Get all the localisationList
        restLocalisationMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(localisation.getId().intValue())))
            .andExpect(jsonPath("$.[*].region").value(hasItem(DEFAULT_REGION.toString())))
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
            .andExpect(jsonPath("$.[*].departementZic").value(hasItem(DEFAULT_DEPARTEMENT_ZIC.toString())))
            .andExpect(jsonPath("$.[*].ia").value(hasItem(DEFAULT_IA)));
    }

    @Test
    @Transactional
    void getLocalisation() throws Exception {
        // Initialize the database
        localisationRepository.saveAndFlush(localisation);

        // Get the localisation
        restLocalisationMockMvc
            .perform(get(ENTITY_API_URL_ID, localisation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(localisation.getId().intValue()))
            .andExpect(jsonPath("$.region").value(DEFAULT_REGION.toString()))
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
            .andExpect(jsonPath("$.departementZic").value(DEFAULT_DEPARTEMENT_ZIC.toString()))
            .andExpect(jsonPath("$.ia").value(DEFAULT_IA));
    }

    @Test
    @Transactional
    void getNonExistingLocalisation() throws Exception {
        // Get the localisation
        restLocalisationMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewLocalisation() throws Exception {
        // Initialize the database
        localisationRepository.saveAndFlush(localisation);

        int databaseSizeBeforeUpdate = localisationRepository.findAll().size();

        // Update the localisation
        Localisation updatedLocalisation = localisationRepository.findById(localisation.getId()).get();
        // Disconnect from session so that the updates on updatedLocalisation are not directly saved in db
        em.detach(updatedLocalisation);
        updatedLocalisation
            .region(UPDATED_REGION)
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
            .departementZic(UPDATED_DEPARTEMENT_ZIC)
            .ia(UPDATED_IA);

        restLocalisationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedLocalisation.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedLocalisation))
            )
            .andExpect(status().isOk());

        // Validate the Localisation in the database
        List<Localisation> localisationList = localisationRepository.findAll();
        assertThat(localisationList).hasSize(databaseSizeBeforeUpdate);
        Localisation testLocalisation = localisationList.get(localisationList.size() - 1);
        assertThat(testLocalisation.getRegion()).isEqualTo(UPDATED_REGION);
        assertThat(testLocalisation.getDepartementDakar()).isEqualTo(UPDATED_DEPARTEMENT_DAKAR);
        assertThat(testLocalisation.getDepartementDiourbel()).isEqualTo(UPDATED_DEPARTEMENT_DIOURBEL);
        assertThat(testLocalisation.getDepartementFatick()).isEqualTo(UPDATED_DEPARTEMENT_FATICK);
        assertThat(testLocalisation.getDepartementKaffrine()).isEqualTo(UPDATED_DEPARTEMENT_KAFFRINE);
        assertThat(testLocalisation.getDepartementKaolack()).isEqualTo(UPDATED_DEPARTEMENT_KAOLACK);
        assertThat(testLocalisation.getDepartementKedougou()).isEqualTo(UPDATED_DEPARTEMENT_KEDOUGOU);
        assertThat(testLocalisation.getDepartementKolda()).isEqualTo(UPDATED_DEPARTEMENT_KOLDA);
        assertThat(testLocalisation.getDepartementLouga()).isEqualTo(UPDATED_DEPARTEMENT_LOUGA);
        assertThat(testLocalisation.getDepartementMatam()).isEqualTo(UPDATED_DEPARTEMENT_MATAM);
        assertThat(testLocalisation.getDepartementSaint()).isEqualTo(UPDATED_DEPARTEMENT_SAINT);
        assertThat(testLocalisation.getDepartementSedhiou()).isEqualTo(UPDATED_DEPARTEMENT_SEDHIOU);
        assertThat(testLocalisation.getDepartementTambacounda()).isEqualTo(UPDATED_DEPARTEMENT_TAMBACOUNDA);
        assertThat(testLocalisation.getDepartementThis()).isEqualTo(UPDATED_DEPARTEMENT_THIS);
        assertThat(testLocalisation.getDepartementZic()).isEqualTo(UPDATED_DEPARTEMENT_ZIC);
        assertThat(testLocalisation.getIa()).isEqualTo(UPDATED_IA);
    }

    @Test
    @Transactional
    void putNonExistingLocalisation() throws Exception {
        int databaseSizeBeforeUpdate = localisationRepository.findAll().size();
        localisation.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLocalisationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, localisation.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(localisation))
            )
            .andExpect(status().isBadRequest());

        // Validate the Localisation in the database
        List<Localisation> localisationList = localisationRepository.findAll();
        assertThat(localisationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchLocalisation() throws Exception {
        int databaseSizeBeforeUpdate = localisationRepository.findAll().size();
        localisation.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLocalisationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(localisation))
            )
            .andExpect(status().isBadRequest());

        // Validate the Localisation in the database
        List<Localisation> localisationList = localisationRepository.findAll();
        assertThat(localisationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamLocalisation() throws Exception {
        int databaseSizeBeforeUpdate = localisationRepository.findAll().size();
        localisation.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLocalisationMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(localisation)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Localisation in the database
        List<Localisation> localisationList = localisationRepository.findAll();
        assertThat(localisationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateLocalisationWithPatch() throws Exception {
        // Initialize the database
        localisationRepository.saveAndFlush(localisation);

        int databaseSizeBeforeUpdate = localisationRepository.findAll().size();

        // Update the localisation using partial update
        Localisation partialUpdatedLocalisation = new Localisation();
        partialUpdatedLocalisation.setId(localisation.getId());

        partialUpdatedLocalisation
            .departementDakar(UPDATED_DEPARTEMENT_DAKAR)
            .departementFatick(UPDATED_DEPARTEMENT_FATICK)
            .departementKaolack(UPDATED_DEPARTEMENT_KAOLACK)
            .departementKedougou(UPDATED_DEPARTEMENT_KEDOUGOU)
            .departementLouga(UPDATED_DEPARTEMENT_LOUGA)
            .departementMatam(UPDATED_DEPARTEMENT_MATAM)
            .departementSaint(UPDATED_DEPARTEMENT_SAINT)
            .departementSedhiou(UPDATED_DEPARTEMENT_SEDHIOU)
            .departementTambacounda(UPDATED_DEPARTEMENT_TAMBACOUNDA)
            .departementThis(UPDATED_DEPARTEMENT_THIS)
            .departementZic(UPDATED_DEPARTEMENT_ZIC)
            .ia(UPDATED_IA);

        restLocalisationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLocalisation.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLocalisation))
            )
            .andExpect(status().isOk());

        // Validate the Localisation in the database
        List<Localisation> localisationList = localisationRepository.findAll();
        assertThat(localisationList).hasSize(databaseSizeBeforeUpdate);
        Localisation testLocalisation = localisationList.get(localisationList.size() - 1);
        assertThat(testLocalisation.getRegion()).isEqualTo(DEFAULT_REGION);
        assertThat(testLocalisation.getDepartementDakar()).isEqualTo(UPDATED_DEPARTEMENT_DAKAR);
        assertThat(testLocalisation.getDepartementDiourbel()).isEqualTo(DEFAULT_DEPARTEMENT_DIOURBEL);
        assertThat(testLocalisation.getDepartementFatick()).isEqualTo(UPDATED_DEPARTEMENT_FATICK);
        assertThat(testLocalisation.getDepartementKaffrine()).isEqualTo(DEFAULT_DEPARTEMENT_KAFFRINE);
        assertThat(testLocalisation.getDepartementKaolack()).isEqualTo(UPDATED_DEPARTEMENT_KAOLACK);
        assertThat(testLocalisation.getDepartementKedougou()).isEqualTo(UPDATED_DEPARTEMENT_KEDOUGOU);
        assertThat(testLocalisation.getDepartementKolda()).isEqualTo(DEFAULT_DEPARTEMENT_KOLDA);
        assertThat(testLocalisation.getDepartementLouga()).isEqualTo(UPDATED_DEPARTEMENT_LOUGA);
        assertThat(testLocalisation.getDepartementMatam()).isEqualTo(UPDATED_DEPARTEMENT_MATAM);
        assertThat(testLocalisation.getDepartementSaint()).isEqualTo(UPDATED_DEPARTEMENT_SAINT);
        assertThat(testLocalisation.getDepartementSedhiou()).isEqualTo(UPDATED_DEPARTEMENT_SEDHIOU);
        assertThat(testLocalisation.getDepartementTambacounda()).isEqualTo(UPDATED_DEPARTEMENT_TAMBACOUNDA);
        assertThat(testLocalisation.getDepartementThis()).isEqualTo(UPDATED_DEPARTEMENT_THIS);
        assertThat(testLocalisation.getDepartementZic()).isEqualTo(UPDATED_DEPARTEMENT_ZIC);
        assertThat(testLocalisation.getIa()).isEqualTo(UPDATED_IA);
    }

    @Test
    @Transactional
    void fullUpdateLocalisationWithPatch() throws Exception {
        // Initialize the database
        localisationRepository.saveAndFlush(localisation);

        int databaseSizeBeforeUpdate = localisationRepository.findAll().size();

        // Update the localisation using partial update
        Localisation partialUpdatedLocalisation = new Localisation();
        partialUpdatedLocalisation.setId(localisation.getId());

        partialUpdatedLocalisation
            .region(UPDATED_REGION)
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
            .departementZic(UPDATED_DEPARTEMENT_ZIC)
            .ia(UPDATED_IA);

        restLocalisationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLocalisation.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLocalisation))
            )
            .andExpect(status().isOk());

        // Validate the Localisation in the database
        List<Localisation> localisationList = localisationRepository.findAll();
        assertThat(localisationList).hasSize(databaseSizeBeforeUpdate);
        Localisation testLocalisation = localisationList.get(localisationList.size() - 1);
        assertThat(testLocalisation.getRegion()).isEqualTo(UPDATED_REGION);
        assertThat(testLocalisation.getDepartementDakar()).isEqualTo(UPDATED_DEPARTEMENT_DAKAR);
        assertThat(testLocalisation.getDepartementDiourbel()).isEqualTo(UPDATED_DEPARTEMENT_DIOURBEL);
        assertThat(testLocalisation.getDepartementFatick()).isEqualTo(UPDATED_DEPARTEMENT_FATICK);
        assertThat(testLocalisation.getDepartementKaffrine()).isEqualTo(UPDATED_DEPARTEMENT_KAFFRINE);
        assertThat(testLocalisation.getDepartementKaolack()).isEqualTo(UPDATED_DEPARTEMENT_KAOLACK);
        assertThat(testLocalisation.getDepartementKedougou()).isEqualTo(UPDATED_DEPARTEMENT_KEDOUGOU);
        assertThat(testLocalisation.getDepartementKolda()).isEqualTo(UPDATED_DEPARTEMENT_KOLDA);
        assertThat(testLocalisation.getDepartementLouga()).isEqualTo(UPDATED_DEPARTEMENT_LOUGA);
        assertThat(testLocalisation.getDepartementMatam()).isEqualTo(UPDATED_DEPARTEMENT_MATAM);
        assertThat(testLocalisation.getDepartementSaint()).isEqualTo(UPDATED_DEPARTEMENT_SAINT);
        assertThat(testLocalisation.getDepartementSedhiou()).isEqualTo(UPDATED_DEPARTEMENT_SEDHIOU);
        assertThat(testLocalisation.getDepartementTambacounda()).isEqualTo(UPDATED_DEPARTEMENT_TAMBACOUNDA);
        assertThat(testLocalisation.getDepartementThis()).isEqualTo(UPDATED_DEPARTEMENT_THIS);
        assertThat(testLocalisation.getDepartementZic()).isEqualTo(UPDATED_DEPARTEMENT_ZIC);
        assertThat(testLocalisation.getIa()).isEqualTo(UPDATED_IA);
    }

    @Test
    @Transactional
    void patchNonExistingLocalisation() throws Exception {
        int databaseSizeBeforeUpdate = localisationRepository.findAll().size();
        localisation.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLocalisationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, localisation.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(localisation))
            )
            .andExpect(status().isBadRequest());

        // Validate the Localisation in the database
        List<Localisation> localisationList = localisationRepository.findAll();
        assertThat(localisationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchLocalisation() throws Exception {
        int databaseSizeBeforeUpdate = localisationRepository.findAll().size();
        localisation.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLocalisationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(localisation))
            )
            .andExpect(status().isBadRequest());

        // Validate the Localisation in the database
        List<Localisation> localisationList = localisationRepository.findAll();
        assertThat(localisationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamLocalisation() throws Exception {
        int databaseSizeBeforeUpdate = localisationRepository.findAll().size();
        localisation.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLocalisationMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(localisation))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Localisation in the database
        List<Localisation> localisationList = localisationRepository.findAll();
        assertThat(localisationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteLocalisation() throws Exception {
        // Initialize the database
        localisationRepository.saveAndFlush(localisation);

        int databaseSizeBeforeDelete = localisationRepository.findAll().size();

        // Delete the localisation
        restLocalisationMockMvc
            .perform(delete(ENTITY_API_URL_ID, localisation.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Localisation> localisationList = localisationRepository.findAll();
        assertThat(localisationList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
