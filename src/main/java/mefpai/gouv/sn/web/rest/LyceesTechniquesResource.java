package mefpai.gouv.sn.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
// import java.util.stream.StreamSupport;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import mefpai.gouv.sn.domain.LyceesTechniques;
import mefpai.gouv.sn.repository.LyceesTechniquesRepository;
import mefpai.gouv.sn.service.LyceesTechniquesService;
import mefpai.gouv.sn.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link mefpai.gouv.sn.domain.LyceesTechniques}.
 */
@RestController
@RequestMapping("/api")
public class LyceesTechniquesResource {

    private final Logger log = LoggerFactory.getLogger(LyceesTechniquesResource.class);

    private static final String ENTITY_NAME = "lyceesTechniques";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LyceesTechniquesService lyceesTechniquesService;

    private final LyceesTechniquesRepository lyceesTechniquesRepository;

    public LyceesTechniquesResource(
        LyceesTechniquesService lyceesTechniquesService,
        LyceesTechniquesRepository lyceesTechniquesRepository
    ) {
        this.lyceesTechniquesService = lyceesTechniquesService;
        this.lyceesTechniquesRepository = lyceesTechniquesRepository;
    }

    /**
     * {@code POST  /lycees-techniques} : Create a new lyceesTechniques.
     *
     * @param lyceesTechniques the lyceesTechniques to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new lyceesTechniques, or with status {@code 400 (Bad Request)} if the lyceesTechniques has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/lycees-techniques")
    public ResponseEntity<LyceesTechniques> createLyceesTechniques(@Valid @RequestBody LyceesTechniques lyceesTechniques)
        throws URISyntaxException {
        log.debug("REST request to save LyceesTechniques : {}", lyceesTechniques);
        if (lyceesTechniques.getId() != null) {
            throw new BadRequestAlertException("A new lyceesTechniques cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LyceesTechniques result = lyceesTechniquesService.save(lyceesTechniques);
        return ResponseEntity
            .created(new URI("/api/lycees-techniques/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /lycees-techniques/:id} : Updates an existing lyceesTechniques.
     *
     * @param id the id of the lyceesTechniques to save.
     * @param lyceesTechniques the lyceesTechniques to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lyceesTechniques,
     * or with status {@code 400 (Bad Request)} if the lyceesTechniques is not valid,
     * or with status {@code 500 (Internal Server Error)} if the lyceesTechniques couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/lycees-techniques/{id}")
    public ResponseEntity<LyceesTechniques> updateLyceesTechniques(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody LyceesTechniques lyceesTechniques
    ) throws URISyntaxException {
        log.debug("REST request to update LyceesTechniques : {}, {}", id, lyceesTechniques);
        if (lyceesTechniques.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, lyceesTechniques.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!lyceesTechniquesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        LyceesTechniques result = lyceesTechniquesService.save(lyceesTechniques);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, lyceesTechniques.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /lycees-techniques/:id} : Partial updates given fields of an existing lyceesTechniques, field will ignore if it is null
     *
     * @param id the id of the lyceesTechniques to save.
     * @param lyceesTechniques the lyceesTechniques to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lyceesTechniques,
     * or with status {@code 400 (Bad Request)} if the lyceesTechniques is not valid,
     * or with status {@code 404 (Not Found)} if the lyceesTechniques is not found,
     * or with status {@code 500 (Internal Server Error)} if the lyceesTechniques couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/lycees-techniques/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<LyceesTechniques> partialUpdateLyceesTechniques(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody LyceesTechniques lyceesTechniques
    ) throws URISyntaxException {
        log.debug("REST request to partial update LyceesTechniques partially : {}, {}", id, lyceesTechniques);
        if (lyceesTechniques.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, lyceesTechniques.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!lyceesTechniquesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<LyceesTechniques> result = lyceesTechniquesService.partialUpdate(lyceesTechniques);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, lyceesTechniques.getId().toString())
        );
    }

    /**
     * {@code GET  /lycees-techniques} : get all the lyceesTechniques.
     *
     * @param pageable the pagination information.
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of lyceesTechniques in body.
     */
    @GetMapping("/lycees-techniques")
    public ResponseEntity<List<LyceesTechniques>> getAllLyceesTechniques(Pageable pageable, @RequestParam(required = false) String filter) {
        if ("lyceetechnique-is-null".equals(filter)) {
            log.debug("REST request to get all LyceesTechniquess where lyceeTechnique is null");
            return new ResponseEntity<>(lyceesTechniquesService.findAllWhereLyceeTechniqueIsNull(), HttpStatus.OK);
        }

        if ("proviseur-is-null".equals(filter)) {
            log.debug("REST request to get all LyceesTechniquess where proviseur is null");
            return new ResponseEntity<>(lyceesTechniquesService.findAllWhereProviseurIsNull(), HttpStatus.OK);
        }

        if ("directeuretude-is-null".equals(filter)) {
            log.debug("REST request to get all LyceesTechniquess where directeurEtude is null");
            return new ResponseEntity<>(lyceesTechniquesService.findAllWhereDirecteurEtudeIsNull(), HttpStatus.OK);
        }

        if ("comptablefinancie-is-null".equals(filter)) {
            log.debug("REST request to get all LyceesTechniquess where comptableFinancie is null");
            return new ResponseEntity<>(lyceesTechniquesService.findAllWhereComptableFinancieIsNull(), HttpStatus.OK);
        }

        if ("comptablematiere-is-null".equals(filter)) {
            log.debug("REST request to get all LyceesTechniquess where comptableMatiere is null");
            return new ResponseEntity<>(lyceesTechniquesService.findAllWhereComptableMatiereIsNull(), HttpStatus.OK);
        }
        log.debug("REST request to get a page of LyceesTechniques");
        Page<LyceesTechniques> page = lyceesTechniquesService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /lycees-techniques/:id} : get the "id" lyceesTechniques.
     *
     * @param id the id of the lyceesTechniques to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the lyceesTechniques, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/lycees-techniques/{id}")
    public ResponseEntity<LyceesTechniques> getLyceesTechniques(@PathVariable Long id) {
        log.debug("REST request to get LyceesTechniques : {}", id);
        Optional<LyceesTechniques> lyceesTechniques = lyceesTechniquesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(lyceesTechniques);
    }

    /**
     * {@code DELETE  /lycees-techniques/:id} : delete the "id" lyceesTechniques.
     *
     * @param id the id of the lyceesTechniques to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/lycees-techniques/{id}")
    public ResponseEntity<Void> deleteLyceesTechniques(@PathVariable Long id) {
        log.debug("REST request to delete LyceesTechniques : {}", id);
        lyceesTechniquesService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
